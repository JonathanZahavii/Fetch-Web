import {
  ActivityLevel,
  Day,
  Gender,
  Goal,
  PreferenceQuestionnaireFormFields,
  Workout,
} from './types';

export enum PreferenceQuestionnaireFieldsNames {
  GENDER = 'gender',
  AGE = 'age',
  WEIGHT = 'weight',
  TARGET_WEIGHT = 'targetWeight',
  HEIGHT = 'height',
  ACTIVITY_LEVEL = 'activityLevel',
  GOALS = 'goals',
  DAYS = 'days',
  WORKOUTS = 'workouts',
  DURATION_IN_MINUTES = 'durationInMinutes',
}

export const ListFieldOptionByType = {
  [PreferenceQuestionnaireFieldsNames.GOALS]: Goal,
  [PreferenceQuestionnaireFieldsNames.DAYS]: Day,
  [PreferenceQuestionnaireFieldsNames.WORKOUTS]: Workout,
};

export const getFormDefaultValues = (): PreferenceQuestionnaireFormFields => ({
  [PreferenceQuestionnaireFieldsNames.GENDER]: Gender.MALE,
  [PreferenceQuestionnaireFieldsNames.AGE]: 0,
  [PreferenceQuestionnaireFieldsNames.WEIGHT]: 0,
  [PreferenceQuestionnaireFieldsNames.TARGET_WEIGHT]: 0,
  [PreferenceQuestionnaireFieldsNames.HEIGHT]: 0,
  [PreferenceQuestionnaireFieldsNames.ACTIVITY_LEVEL]: ActivityLevel.BEGINNER,
  [PreferenceQuestionnaireFieldsNames.GOALS]: [],
  [PreferenceQuestionnaireFieldsNames.DAYS]: [],
  [PreferenceQuestionnaireFieldsNames.WORKOUTS]: [],
  [PreferenceQuestionnaireFieldsNames.DURATION_IN_MINUTES]: 0,
});
