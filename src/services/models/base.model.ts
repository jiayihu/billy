import uuid = require('uuid');

abstract class BaseModel {
  generateId(entity: string): string {
    return `${entity.toUpperCase()}_${uuid.v4()}`;
  }
}

export default BaseModel;
