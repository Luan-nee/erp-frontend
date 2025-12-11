export type Categoria = {
  id: number;
  nombre: string;
  descripcion: string;
}

export type PropCategoria = {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad_productos: number;
}

export type PropResumenCategoria = {
  total_categorias: number;
  total_productos: number;
  promedio_categoria: number; 
}