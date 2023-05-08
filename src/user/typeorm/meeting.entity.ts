import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Transform } from "class-transformer";
import moment from "moment-timezone";

// @Entity()
// export class Meeting extends BaseEntity{
//     @PrimaryGeneratedColumn({name:'meeting_id'})
//     id:number;

//     @Column()
//     @IsNotEmpty()
//     title:string;

//     @Column()
//     @IsNotEmpty()
//     meetingType:string;

//     @Column({ type: 'timestamp with time zone' , })
//     meetingDate:Date;

//     @Column({ type: 'time with time zone' , })
//     meetingStartTime:Date;

//     @Column({ type: 'time with time zone' , })
//     meetingEndTime:Date;

//     @Column({ type: 'timestamp with time zone', nullable: true })
//     meetingStartReminder:Date;

//     @Column()
//     initiator:string;

//     @Column()
//     @IsNotEmpty()
//     location:string;

//     @Column()
//     @IsNotEmpty()
//     invitees:string;

//     @Column({nullable:true})
//     uploadfile:string;
// }

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

    @Transform(({ value }) => moment(value,'DD-MM-YYYY').toDate())
    @Column({ type: 'date' , })
    meetingDate:Date;

    @Transform(({ value }) => moment(value, 'HH:mm:ss').format('hh:mm A'))
    @Column({ type: 'time' , })
    meetingStartTime:Date;

    @Transform(({ value }) => moment(value, 'HH:mm:ss').format('hh:mm A'))
    @Column({ type: 'time' , })
    meetingEndTime:Date;

    @Transform(({ value }) => moment(value, 'HH:mm:ss').format('hh:mm A'))
    @Column({ type: 'time', nullable: true })
    meetingStartReminder:Date;
    
    @Column()
    initiator:string;

    @Column()
    @IsNotEmpty()
    location:string;

    @Column()
    @IsNotEmpty()
    invitees:string;

    @Column({nullable:true})
    uploadfile:string;
}