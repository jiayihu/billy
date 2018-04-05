import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const LOCALSTORAGE = 'billy-store';

/**
 * Set application configuration on startup
 * @see {https://gist.github.com/fernandohu/122e88c3bcd210bbe41c608c36306db9}
 */

@Injectable()
export default class ConfigService {
  private config = {};

  constructor(private http: HttpClient) {}

  get(key: string) {
    return this.config[key];
  }

  /**
   * This should load a .json config file from the server, but for now it sets
   * the config field sincronously
   */
  load() {
    this.config = {
      LOCALSTORAGE,
    };
  }
}
