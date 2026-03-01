import { DownloadHistory } from "../../entities/download-history.entity.js";

export interface DownloadHistoryRepository {
  save(entry: DownloadHistory): void;
  findAll(): DownloadHistory[];
}
