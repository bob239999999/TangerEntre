import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'bytea' })
    audio: Buffer;

    @Column()
    userId: number;
}
