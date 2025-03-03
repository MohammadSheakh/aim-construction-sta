// export type TAttachmentType = 'pdf' | 'image'; 

// export type TAttachedToType = 'note' | 'task'; 

// export type TUploaderRole = 'projectManager' | 'projectSupervisor' ;


export enum AttachmentType {
    pdf = 'pdf',
    image = 'image',
}
  
export enum AttachedToType {
    note = 'note',
    task = 'task',
}
  
export enum UploaderRole {
    projectManager = 'projectManager',
    projectSupervisor = 'projectSupervisor',
}