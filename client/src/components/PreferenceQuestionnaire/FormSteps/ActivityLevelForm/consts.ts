import { ActivityLevel } from '../../types';

export const ActivityLevelDescription: Record<ActivityLevel, string> = {
  [ActivityLevel.BEGINNER]: 'not very active',
  [ActivityLevel.INTERMEDIATE]: 'Spend a good part of the day on your feet',
  [ActivityLevel.ADVANCED]: 'Spend most of the dat doing physical activities',
};
