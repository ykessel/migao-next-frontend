interface DecodedToken {
  _id: string,
  email: string;
  type: string;

  firstName: string,
  lastName: string,
  allowedPropertyPosts: number,
  avatar: {
    url: string,
    thumb: string,
    sizes: unknown[]
  },
  iat: number;
  exp: number;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export function getUserFromToken(token: string | null): DecodedToken | null {
  if (!token) return null;
  
  const decoded = decodeToken(token);
  if (!decoded) return null;
  const {_id, email, type,  firstName, lastName,allowedPropertyPosts, avatar, iat, exp } = decoded;

  return {
    _id,
    email,
    type,
    firstName,
    lastName,
    allowedPropertyPosts,
    avatar,
    iat,
    exp
  };
} 