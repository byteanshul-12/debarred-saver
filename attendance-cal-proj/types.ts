export interface AttendanceState {
  attended: number;
  total: number;
}

export interface MemeResponse {
  topText: string;
  bottomText: string;
  mood: 'chill' | 'panic';
  templateId: 'success' | 'smart' | 'drake' | 'fine' | 'panik' | 'clown' | 'disaster' | 'pauper' | 'cheers' | 'sweating' | 'grave' | 'buttons';
  templateAdvice: string;
}

export const THRESHOLD = 75.0;