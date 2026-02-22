import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export class MongoRepository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async find(query: FilterQuery<T> = {}, sort: any = null): Promise<T[]> {
    let cursor = this.model
      .find(query);

    if (sort) {
      cursor = cursor.sort(sort);
    }

    return cursor
      .exec();
  }

  async findOne(query: FilterQuery<T> = {}): Promise<T | null> {
    return this.model
      .findOne(query)
      .exec();
  }

  async create(doc: Partial<T>): Promise<T> {
    return this.model
      .create(doc);
  }

  async update(filter: FilterQuery<T>, updateDoc: UpdateQuery<T>): Promise<any> {
    return this.model
      .updateOne(filter, updateDoc)
      .exec();
  }

  async remove(filter: FilterQuery<T>): Promise<any> {
    return this.model
      .deleteOne(filter)
      .exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model
      .findById(id)
      .exec();
  }
}
