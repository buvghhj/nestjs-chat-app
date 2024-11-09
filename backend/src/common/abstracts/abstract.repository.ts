import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractEntity } from "./abstract.entity";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<T extends AbstractEntity> {

    protected abstract readonly logger: Logger

    constructor(public readonly model: Model<T>) { }

    async create(document: Omit<T, '_id'>): Promise<T> {

        const createDocument = new this.model({

            ...document,

            _id: new Types.ObjectId()

        })

        const saveDocument = (await createDocument.save()).toJSON() as unknown as T

        return saveDocument

    }

    async findOne(filterQuery: FilterQuery<T>): Promise<T> {

        const document = await this.model.findOne(filterQuery).lean<T>()

        if (!document) {

            this.logger.warn('Document not found with filterQuery', filterQuery)

            throw new NotFoundException('Document not found.')

        }

        return document

    }

    async findOneAndUpdate(filterQuery: FilterQuery<T>, update: UpdateQuery<T>): Promise<T> {

        const document = await this.model.findOneAndUpdate(filterQuery, update, { new: true }).lean<T>()

        if (!document) {

            this.logger.warn('Document not found with filterQuery', filterQuery)

            throw new NotFoundException('Document not found.')

        }

        return document

    }

    async find(filterQuery: FilterQuery<T>): Promise<T[]> {

        return this.model.find(filterQuery).lean<T[]>()

    }

    async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {

        return this.model.findOneAndDelete(filterQuery).lean<T>()

    }

}