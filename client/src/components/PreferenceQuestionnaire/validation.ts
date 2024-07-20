import * as yup from 'yup';
import {
  ActivityLevel,
  Day,
  Gender,
  Goal,
  PreferenceQuestionnaireFormFields,
  Workout,
} from './types';
import dictionary from '@/dictionary';

const {
  preferencesQuestionnaire: {
    validations: {
      missingAge,
      missingWeight,
      missingHeight,
      missingActivityLevel,
      missingGoals,
      missingDays,
      missingWorkouts,
      missingDuration,
    },
  },
} = dictionary;

export const validationSchema: yup.ObjectSchema<PreferenceQuestionnaireFormFields> = yup
  .object<PreferenceQuestionnaireFormFields>()
  .shape({
    gender: yup.mixed<Gender>().oneOf(Object.values(Gender)).required(),
    age: yup.number().moreThan(0).required(missingAge),
    weight: yup.number().moreThan(0).required(missingWeight),
    height: yup.number().moreThan(0).required(missingHeight),
    targetWeight: yup.number().optional(),
    activityLevel: yup
      .mixed<ActivityLevel>()
      .oneOf(Object.values(ActivityLevel))
      .required(missingActivityLevel),
    goals: yup
      .array()
      .of(yup.object().shape({ goal: yup.mixed<Goal>().oneOf(Object.values(Goal)).required() }))
      .required(missingGoals),
    days: yup
      .array()
      .of(yup.object().shape({ day: yup.mixed<Day>().oneOf(Object.values(Day)).required() }))
      .required(missingDays),
    workouts: yup
      .array()
      .of(
        yup
          .object()
          .shape({ workout: yup.mixed<Workout>().oneOf(Object.values(Workout)).required() })
      )
      .required(missingWorkouts),
    durationInMinutes: yup.number().moreThan(0).lessThan(60).required(missingDuration),
  });
