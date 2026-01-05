import { useState, useMemo, useEffect} from 'react';
import { X, User, Phone, CreditCard, Clock, DollarSign, MapPin, Save, AlertCircle } from 'lucide-react';
import ColaboradorService from '../../service/colaborador.service';
import SucursalService from '../../service/sucursal.service.ts';
import type { RegistrarColaborador } from '../../models/colaboradores.model.ts';
import type { SucursalSelect } from '../../models/sucursal.model.ts';
import SelectLocal from '../../utils/SelectLocal';

interface FormCreateProps {
  setShowFormCreate: (show: boolean) => void;
} 

export default function FormCreate({ setShowFormCreate }: FormCreateProps) {
  const colaboradorService = useMemo(() => new ColaboradorService(), []); 
  const sucursalService = useMemo(() => new SucursalService(), []); 

  const [formData, setFormData] = useState<RegistrarColaborador>({
    nombres: '',
    apellidos: '',
    dni: '',
    estaActivo: true,
    celular: '',
    hora_inicio_jornada: '08:00',
    hora_fin_jornada: '18:00',
    sueldo: 0,
    id_sucursal: 1
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [sucursales, setSucursales] = useState<SucursalSelect[] | null>([
    {
      id: 0,
      nombre: '',
      direccion: '',
      tipo_sucursal: 'central'
    }
  ]);
  const [isLoadingSucursales, setIsLoadingSucursales] = useState<boolean>(false);
  const [isErrorSucursales, setIsErrorSucursales] = useState<boolean>(false);

  const refreshSucursales = async () => {
    setIsLoadingSucursales(true);
    setIsErrorSucursales(false);
    const { data, isLoading, hayError} = await sucursalService.getSucursales();
    setSucursales(data);
    setIsLoadingSucursales(isLoading)
    setIsErrorSucursales(hayError);
  }

  useEffect(() => {
    refreshSucursales();
  }, [sucursalService]);

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrarColaborador, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'sueldo' || name === 'id_sucursal') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name as keyof RegistrarColaborador]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrarColaborador, string>> = {};

    if (!formData.nombres.trim()) newErrors.nombres = 'Los nombres son requeridos';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son requeridos';
    if (!formData.dni.trim()) newErrors.dni = 'El DNI es requerido';
    else if (formData.dni.length !== 8) newErrors.dni = 'El DNI debe tener 8 dígitos';
    if (!formData.celular.trim()) newErrors.celular = 'El celular es requerido';
    else if (formData.celular.length !== 9) newErrors.celular = 'El celular debe tener 9 dígitos';
    if (formData.sueldo <= 0) newErrors.sueldo = 'El sueldo debe ser mayor a 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      setIsError(false);
      try {
        const nuevoColaborador = formData;
        await colaboradorService.registrarColaborador(nuevoColaborador);
        setShowFormCreate(false);
      } catch (error) {
        console.error('Error al registrar colaborador:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8">
      <div className="h-full bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl overflow-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-t-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <User className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Nuevo Colaborador</h1>
                <p className="text-slate-400 text-sm">Completa el formulario para registrar un colaborador</p>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              onClick={()=> {setShowFormCreate(false)}}
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/20 backdrop-blur-sm border-x border-slate-700/50 p-8">
          {/* Información Laboral */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Información Laboral
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sueldo */}
              <div>
                <label htmlFor="sueldo" className="block text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Sueldo (S/) <span className="text-red-400">*</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="sueldo"
                    name="sueldo"
                    value={formData.sueldo || ''}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border ${
                      errors.sueldo ? 'border-red-500' : 'border-slate-600'
                    } focus:outline-none focus:border-emerald-500 transition-colors`}
                    placeholder="1500.00"
                  />
                  {errors.sueldo && (
                    <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.sueldo}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sucursal */}
              <div>
                <label htmlFor="id_sucursal" className="block text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Sucursal
                  </div>
                </label>
                <SelectLocal
                  sucursales={sucursales}
                  onSelect={(sucursal) => setFormData({ ...formData, id_sucursal: sucursal.id })}
                />
              </div>

              {/* Hora Inicio */}
              <div>
                <label htmlFor="hora_inicio_jornada" className="block text-sm font-medium text-slate-300 mb-2">
                  Hora de inicio
                </label>
                <input
                  type="time"
                  id="hora_inicio_jornada"
                  name="hora_inicio_jornada"
                  value={formData.hora_inicio_jornada}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Hora Fin */}
              <div>
                <label htmlFor="hora_fin_jornada" className="block text-sm font-medium text-slate-300 mb-2">
                  Hora de fin
                </label>
                <input
                  type="time"
                  id="hora_fin_jornada"
                  name="hora_fin_jornada"
                  value={formData.hora_fin_jornada}
                  onChange={handleChange}
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Información Personal */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-400" />
              Información Personal
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombres */}
              <div>
                <label htmlFor="nombres" className="block text-sm font-medium text-slate-300 mb-2">
                  Nombres <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    className={`w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border ${
                      errors.nombres ? 'border-red-500' : 'border-slate-600'
                    } focus:outline-none focus:border-emerald-500 transition-colors`}
                    placeholder="Ingrese los nombres"
                  />
                  {errors.nombres && (
                    <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.nombres}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Apellidos */}
              <div>
                <label htmlFor="apellidos" className="block text-sm font-medium text-slate-300 mb-2">
                  Apellidos <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    className={`w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border ${
                      errors.apellidos ? 'border-red-500' : 'border-slate-600'
                    } focus:outline-none focus:border-emerald-500 transition-colors`}
                    placeholder="Ingrese los apellidos"
                  />
                  {errors.apellidos && (
                    <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.apellidos}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* DNI */}
              <div>
                <label htmlFor="dni" className="block text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    DNI <span className="text-red-400">*</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    maxLength={8}
                    className={`w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border ${
                      errors.dni ? 'border-red-500' : 'border-slate-600'
                    } focus:outline-none focus:border-emerald-500 transition-colors`}
                    placeholder="12345678"
                  />
                  {errors.dni && (
                    <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.dni}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Celular */}
              <div>
                <label htmlFor="celular" className="block text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Celular <span className="text-red-400">*</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="celular"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    maxLength={9}
                    className={`w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border ${
                      errors.celular ? 'border-red-500' : 'border-slate-600'
                    } focus:outline-none focus:border-emerald-500 transition-colors`}
                    placeholder="987654321"
                  />
                  {errors.celular && (
                    <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.celular}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Estado */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Estado</h2>
            
            <div className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <input
                type="checkbox"
                id="estaActivo"
                name="estaActivo"
                checked={formData.estaActivo}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-slate-600 border-slate-500 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800"
              />
              <label htmlFor="estaActivo" className="text-slate-300 cursor-pointer select-none">
                Colaborador activo
              </label>
              {formData.estaActivo && (
                <span className="ml-auto px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
                  Activo
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-b-2xl border border-slate-700/50 p-6 flex justify-end gap-3">
          <button
            onClick={() => setShowFormCreate(false)}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold"
          >
            <Save className="w-4 h-4" />
            Guardar Colaborador
          </button>
        </div>
      </div>
    </div>
  );
};