// ubicacion del actual archivo src\app\interfaces\auth.ts
export interface User {
    password: string;
    username: string;
    name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    image: string | null;
    age: number | null;
    descripcion: string;
    numero_celular: string;
}