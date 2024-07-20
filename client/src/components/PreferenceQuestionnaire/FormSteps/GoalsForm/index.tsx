import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Goal, PreferenceQuestionnaireFormFields } from '../../types';
import { PreferenceQuestionnaireFieldsNames } from '../../formFields';
import { PreferencesListFieldForm } from '../PreferencesListFieldForm';

export const GoalsForm: React.FC = () => {
  const { control } = useFormContext<PreferenceQuestionnaireFormFields>();
  const { append, remove, fields } = useFieldArray({
    control,
    name: PreferenceQuestionnaireFieldsNames.GOALS,
  });

  const isGoalSelected = useCallback(
    (goal: string) => !!fields.find((field) => field.goal === goal),
    [fields]
  );

  const onGoalChange = useCallback(
    (value: string) => {
      if (isGoalSelected(value)) {
        remove(fields.findIndex((field) => field.goal === value));
      } else {
        if (fields.length < 3) {
          append({ goal: value as Goal });
        }
      }
    },
    [fields, isGoalSelected, append, remove]
  );

  return (
    <PreferencesListFieldForm
      title={'What are your goals?'}
      subTitle={'Select up to 3 goals'}
      fieldName={PreferenceQuestionnaireFieldsNames.GOALS}
      isItemSelected={isGoalSelected}
      onItemClick={onGoalChange}
    />
  );
};
