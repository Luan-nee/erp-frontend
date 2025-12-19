export type Marca = {
  id: number;
  nombre: string;
  descripcion: string;
}

export type PropMarca = {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad_productos: number;
}

export type PropResumenMarca = {
  total_marcas: number;
  total_productos: number;
  promedio_marca: number; 
}

export type MarcaCreate = {
  nombre: string;
  descripcion: string;
};

export type MarcaUpdate = {
  nombre: string;
  descripcion: string;
};