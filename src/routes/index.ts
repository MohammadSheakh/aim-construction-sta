import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { SettingsRoutes } from '../modules/settings/settings.routes';
 import { AdminRoutes } from '../modules/admin/admin.routes';

import { ProjectRoutes } from '../modules/project/project.route';
import { NoteRoutes } from '../modules/note/note.route';

import { ContractRoutes } from '../modules/contract/contract.route';
import { TaskRoutes } from '../modules/task/task.route';
import { AttachmentRoutes } from '../modules/attachments/attachment.route';

// import { ChatRoutes } from '../modules/chat/chat.routes';
// import { MessageRoutes } from '../modules/message/message.routes';
const router = express.Router();

const apiRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  
  {
    path: '/settings',
    route: SettingsRoutes,
  },
  ////////////////////// Created By Mohammad Sheakh
  {
    path: '/note',
    route: NoteRoutes,
  },
  
  {
    path: '/contract',
    route: ContractRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/task',
    route: TaskRoutes,
  },

  {
    path: '/attachment',
    route: AttachmentRoutes,
  },
  
  
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
