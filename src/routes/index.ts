import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { SettingsRoutes } from '../modules/settings/settings.routes';
 import { AdminRoutes } from '../modules/admin/admin.routes';
import { ContractRoutes } from '../modules/contract/contract.routes';
import { DailyLogRoutes } from '../modules/dailyLog/dailyLog.routes';
import { NoteRoutes } from '../modules/note/note.route';
import { ProjectRoutes } from '../modules/project/project.route';
import { TaskRoutes } from '../modules/task/task.route';
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
    path: '/dailyLog',
    route: DailyLogRoutes,
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
  
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
