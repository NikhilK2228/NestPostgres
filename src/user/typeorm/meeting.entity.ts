import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Transform } from "class-transformer";
import moment from "moment-timezone";

@Entity()
export class Meeting extends BaseEntity{
    @PrimaryGeneratedColumn({name:'meeting_id'})
    id:number;

    @Column()
    @IsNotEmpty()
    title:string;

    @Column()
    @IsNotEmpty()
    meetingType:string;

    @Transform(({ value }) => moment.utc(value, 'DD-MM-YYYY').toDate())
    @Column({ type: 'date' })
    meetingDate: Date;

    @Transform(({ value }) => moment.utc(value, 'HH:mm:ss').toDate())
    @Column({ type: 'time' })
    meetingStartTime: Date;

    @Transform(({ value }) => moment.utc(value, 'HH:mm:ss').toDate())
    @Column({ type: 'time' })
    meetingEndTime: Date;

    @Transform(({ value }) => value ? moment.utc(value, 'HH:mm:ss').toDate() : null)
    @Column({ type: 'time', nullable: true })
    meetingStartReminder: Date;
    
    @Column()
    initiator:string;

    @Column()
    @IsNotEmpty()
    location:string;

    @Column("simple-array")
    @IsNotEmpty()
    invitees:string[];

    @Column({nullable:true})
    uploadfile:string;
}