import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userData = localStorage.getItem('user');

  if (!userData) {
    return next(req);
  }

  const user = JSON.parse(userData);

  const accessToken = user.accessToken;

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log('Interceptor Token:', accessToken);
  return next(clonedRequest);
};
