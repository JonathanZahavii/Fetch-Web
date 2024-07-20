export type PreferenceQuestionnaireFormFields = {
  gender: Gender;
  age: number;
  weight: number;
  targetWeight?: number;
  height: number;
  activityLevel: ActivityLevel;
  goals: { goal: Goal }[];
  days: { day: Day }[];
  workouts: { workout: Workout }[];
  durationInMinutes: number;
};

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum ActivityLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export enum Goal {
  LOSE_WEIGHT = 'Lose weight',
  MAINTAIN_WEIGHT = 'Maintain weight',
  GAIN_MUSCLE = 'Gain muscle',
  BUILD_MUSCLE = 'Build muscle',
}

export enum Day {
  SUNDAY = 'Sunday',
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
}

export enum Workout {
  WALK = 'walk',
  RUN = 'run',
  STRENGTH_WORKOUT = 'strength workout',
  YOGA = 'yoga',
  SWIMMING = 'swimming',
  CYCLING = 'cycling',
}
