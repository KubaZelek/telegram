import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'message' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sender' })
  sender: string;

  @Column({ name: 'message' })
  message: string;

  @Column({ name: 'receiver' })
  receiver: string;

  @Column({ name: 'createDate' })
  createDate: string;

  @Column({ name: 'updateDate' })
  updateDate: string;
}
