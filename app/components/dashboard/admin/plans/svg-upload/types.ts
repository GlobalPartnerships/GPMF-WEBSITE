export interface CloudinaryImage {
  id: string;
  url: string;
  publicId: string;
  format: string;
  category: string;
  created_at: string;
}

export interface UploadResponse {
  success: boolean;
  data: {
    url: string;
    publicId: string;
    format: string;
  };
}

export interface SvgListResponse {
  success: boolean;
  data: CloudinaryImage[];
}

export interface SyncResponse {
  success: boolean;
  data: {
    added: number;
    alreadySynced: number;
    totalInCloud: number;
  };
}

export type UploadStatus = "idle" | "uploading" | "success" | "error";
