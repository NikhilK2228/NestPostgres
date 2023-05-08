export class CreateMeetingDto{
    title : string;
    
    meetingType : string;

    meetingDate : Date;

    meetingStartTime:Date;

    meetingEndTime:Date;

    meetingStartReminder:Date;

    initiator:string;

    location:string;

    invitees:string;

    uploadfile:string;

}