import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/api/auth/guards/roles.guard';

const RolesProvider: Provider = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

// const appProvidersConfig = [RolesProvider];
const appProvidersConfig = [];

export default appProvidersConfig;
