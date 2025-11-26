export enum ImageSize {
  SIZE_1K = '1K',
  SIZE_2K = '2K',
  SIZE_4K = '4K'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AnalysisResult {
  score: number;
  fluffPercentage: number;
  aiLikelihood: number;
  summary: string;
}
