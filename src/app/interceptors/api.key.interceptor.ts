import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      'WEBSITE_API_KEY_HEADER': environment.API_KEY,
    },
  });

  return next(req);
};
