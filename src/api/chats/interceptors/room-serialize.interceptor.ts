import { SerializeInterceptor } from 'src/api/shared/interceptors/serialize.interceptor';
import { RoomResponseDto } from '../responses/room.response.dto';

export const RoomSerializeInterceptor = new SerializeInterceptor(
  RoomResponseDto,
);
