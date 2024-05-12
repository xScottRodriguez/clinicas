/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ARR_TAGS, PROVIDES_AND_INVALIDATE_TAGS } from '../../constants';

// Define a service using a base URL and expected endpoints
export const clinicalApi = createApi({
  reducerPath: 'clinicalApi',
  tagTypes: ARR_TAGS,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend-clinica.sn-4.tecnologiasv.com/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth',
        body,
        method: 'POST',
      }),
    }),
    getPeoples: builder.query({
      query: (filtering = '') => {
        const filter = filtering.length ? { filter: filtering } : {};
        return {
          url: '/personas',
          params: filter,
        };
      },
      transformResponse: (response) =>
        response.data?.map((item) => ({
          ...item,
          fullName: `${item.primerNombre} ${item.primerApellido}`,
        })),
      staleTime: 10_000,
      keepUnusedDataFor: 120,
    }),

    getAllergics: builder.query({
      keepUnusedDataFor: 120,
      query: () => `/alergias`,
    }),
    getSymptomsOfAllergies: builder.query({
      keepUnusedDataFor: 120,
      query: () => `/sintomas-alergias`,
    }),

    getModules: builder.query({
      query: () => ({
        url: '/modulo',
        params: {},
      }),

      keepUnusedDataFor: 120,
    }),
    getUsers: builder.query({
      query: (filter = '') => ({
        url: '/user',
        params: {
          filter,
        },

        keepUnusedDataFor: 120,
      }),
    }),
    getRoles: builder.query({
      query: (filter = '') => ({
        url: '/roles',
        params: { filter },
        keepUnusedDataFor: 120,
      }),
    }),

    //* REGISTROS
    getHereditaryDiseases: builder.query({
      keepUnusedDataFor: 120,
      query: () => `/registros/enfermedad-hereditaria`,
    }),
    getPathologicalDiseases: builder.query({
      keepUnusedDataFor: 120,
      query: () => `/registros/patologica-caracteristica`,
    }),
    getRelationShipToDiseases: builder.query({
      keepUnusedDataFor: 120,
      query: () => `/registros/comodin/parentesco`,
    }),
    getEts: builder.query({
      query: () => '/registros/comodin/vaginitis',
      keepUnusedDataFor: 120,
    }),
    getSmookingData: builder.query({
      query: () => '/registros/comodin/tabaquismo',
      keepUnusedDataFor: 120,
    }),
    getAlcholismData: builder.query({
      query: () => '/registros/comodin/alcoholismo',
      keepUnusedDataFor: 120,
    }),

    // * GENERALES
    getPerinatalData: builder.query({
      query: () => '/generales/puntuaciones',

      keepUnusedDataFor: 120,
    }),
    getForContraceptiveMethods: builder.query({
      query: () => '/generales/alteracion-menstrual',
      keepUnusedDataFor: 120,
    }),

    getContraceptiveMethods: builder.query({
      query: () => '/generales/anticonceptivos',
      keepUnusedDataFor: 120,
    }),

    getRelationships: builder.query({
      keepUnusedDataFor: 120,
      query: () => `/generales/parentesco`,
    }),
    getIdentityCard: builder.query({
      keepUnusedDataFor: 120,
      query: () => `/generales/documentos-identidad`,
    }),
    getProfessions: builder.query({
      keepUnusedDataFor: 120,
      query: () => `/generales/profesion`,
    }),
    getSexuallyTransmittedDiseases: builder.query({
      query: () => '/generales/ets',

      keepUnusedDataFor: 120,
    }),
    getComplications: builder.query({
      query: () => '/generales/complicaciones',

      keepUnusedDataFor: 120,
    }),
    getPregnancyHistory: builder.query({
      query: () => '/generales/antecedente-embarazo',

      keepUnusedDataFor: 120,
    }),
    getObstetricDiseases: builder.query({
      query: () => '/generales/enfermedad-obstetrica',

      keepUnusedDataFor: 120,
    }),
    getDrugs: builder.query({
      query: () => '/generales/toxinas',

      keepUnusedDataFor: 120,
    }),
    severities: builder.query({
      query: () => '/generales/severidad',
      keepUnusedDataFor: 120,
    }),

    //* EXPEDIENTES
    updateIncapacity: builder.mutation({
      query: ({ id, ...rest }) => {
        return {
          url: `/expedientes/incapacidad/${id}`,
          method: 'PATCH',
          body: rest,
        };
      },
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.INCAPACITIES],
    }),
    deleteIncapcity: builder.mutation({
      query: (id) => ({
        url: `/expedientes/incapacidad/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.INCAPACITIES],
    }),

    getIncapacities: builder.query({
      query: ({ id }) => {
        if (!id) return `/expedientes/incapacidad/0`;

        return `/expedientes/incapacidad/${id}`;
      },
      keepUnusedDataFor: 120,
      transformResponse: (response) =>
        response?.map((item) => {
          const { fechaInicio, fechaFin, ...rest } = item;

          return {
            ...rest,
            fechaInicio: fechaInicio?.split('T')?.[0],
            fechaFin: fechaFin?.split('T')?.[0],
          };
        }),
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.INCAPACITIES],
    }),
    getNoPathologicalDiseaseForFile: builder.query({
      query: (id) => `/expedientes/no-patologico/${id}`,

      keepUnusedDataFor: 120,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.NO_PATHOLOGICAL_DISEASES],
    }),
    getPregnancyHistoryForFile: builder.query({
      query: (id) => `/expedientes/perenitales/${id}`,

      keepUnusedDataFor: 120,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.PERINATAL_DATA],
    }),
    getInterrogationForFile: builder.query({
      query: (id) => `/expedientes/consultas/${id}`,
      keepUnusedDataFor: 120,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS],
    }),
    getFolderById: builder.query({
      query: (id) => `/expedientes/${id}`,

      keepUnusedDataFor: 120,
    }),
    getFolderPeoples: builder.query({
      query: (search = '') => {
        const params = search ? { search } : {};
        return {
          url: '/expedientes/pacientes',
          params: {
            ...params,
            limit: 100,
          },
        };
      },
      transformResponse: (response) => response.data?.map((item) => item),
      staleTime: 10_000,
      keepUnusedDataFor: 120,
    }),
    getClinicalRecords: builder.query({
      query: (filter = '') => {
        const search = filter.length ? { search: filter } : {};
        return {
          url: '/expedientes',
          params: search,
        };
      },
      transformResponse: (response) => response.data?.map((item) => item),

      keepUnusedDataFor: 120,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.CLINICAL_RECORDS],
    }),

    // * MUTACIONES EXPEDIENTES
    saveIncapacity: builder.mutation({
      query: (body) => ({
        url: '/expedientes/incapacidad',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.INCAPACITIES],
    }),
    saveAllergies: builder.mutation({
      query: (body) => ({
        url: '/expedientes/alergias',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.ALLERGIES],
    }),
    saveHereditary: builder.mutation({
      query: (body) => ({
        url: '/expedientes/hereditario',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.HEREDITARIES],
    }),
    savePathologicalDiseases: builder.mutation({
      query: (body) => ({
        url: '/expedientes/patologico',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.PATHOLOGICAL_DISEASES],
    }),
    saveNoPathologicalDiseases: builder.mutation({
      query: (body) => ({
        url: '/expedientes/no-patologico',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.NO_PATHOLOGICAL_DISEASES],
    }),
    savePerinatalData: builder.mutation({
      query: (body) => ({
        url: '/expedientes/perenitales',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.PERINATAL_DATA],
    }),
    saveFisicalExploration: builder.mutation({
      query: (body) => ({
        url: '/expedientes/exploracion-fisica',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.FISICAL_EXPLORATION],
    }),

    saveExpedient: builder.mutation({
      query: (body) => ({
        url: '/expedientes',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.CLINICAL_RECORDS],
    }),
    getFisicalExplorationForFile: builder.query({
      query: (id) => `/expedientes/exploracion-fisica/${id}`,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.FISICAL_EXPLORATION],
    }),
    getAllergiesForFile: builder.query({
      query: (id) => `/expedientes/alergias/${id}`,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.ALLERGIES],
    }),

    saveGinecological: builder.mutation({
      query: (body) => ({
        url: '/expedientes/ginecologico',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.GINECOLOGICAL],
    }),
    saveObstetric: builder.mutation({
      query: (body) => ({
        url: '/expedientes/obstretico',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.OBSTETRIC],
    }),
    getObstetricDiseasesForFile: builder.query({
      query: (id) => `/expedientes/obstretico/${id}`,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.OBSTETRIC],
    }),
    getGinecologicalForFile: builder.query({
      query: (id) => `/expedientes/ginecologico/${id}`,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.GINECOLOGICAL],
    }),
    getHereditariesForFile: builder.query({
      query: (id) => `/expedientes/hereditario/${id}`,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.HEREDITARIES],
    }),
    getPathologicalDiseasesForFile: builder.query({
      query: (id) => `/expedientes/patologico/${id}`,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.PATHOLOGICAL_DISEASES],
    }),
    // ? DIAGNOSTICOS
    getDiagnostics: builder.query({
      query: (id) => '/consultas/diagnostico',
    }),

    // ? PRESCRIPCIONES O CONSULTAS
    saveInterrogation: builder.mutation({
      query: (body) => ({
        url: '/consultas',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        PROVIDES_AND_INVALIDATE_TAGS.INTERROGATION,
        PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS,
      ],
    }),

    updateConsulta: builder.mutation({
      query: ({ body, consultaId }) => {
        return {
          url: `/consultas/${consultaId}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS],
    }),

    deleteConsulta: builder.mutation({
      query: ({ id }) => ({
        url: `/consultas/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS],
    }),
    createDiagnostico: builder.mutation({
      query: (body) => ({
        url: `/consultas/consulta-diagnostico`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.DIAGNOSTICOS],
    }),
    updateDiagnostico: builder.mutation({
      query: ({ body, id }) => ({
        url: `/consultas/consulta-diagnostico/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.DIAGNOSTICOS],
    }),
    deleteDiagnostico: builder.mutation({
      query: ({ id }) => ({
        url: `/consultas/consulta-diagnostico/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.DIAGNOSTICOS],
    }),

    diagnosticos: builder.query({
      query: (filter = '') => {
        const params = filter.length > 0 ? { search: filter } : {};
        return {
          url: '/consultas/diagnostico',
          params,
        };
      },
      transformResponse: (response) => response.data?.map((item) => item),
      staleTime: 10_000,
      keepUnusedDataFor: 120,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.DIAGNOSTICOS],
    }),
    consultas: builder.query({
      query: ({ search = '' }) => {
        const params = search?.length ? { search } : {};
        return {
          url: '/consultas',
          params: {
            ...params,
            limit: 1000,
          },
          method: 'GET',
        };
      },
      transformResponse: (response) => response.data?.map((item) => item),
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS],
      staleTime: 10_000,
      keepUnusedDataFor: 120,
    }),
    searchConsultaById: builder.query({
      query: (consultaId) => {
        return {
          url: `/consultas/${consultaId}`,
          method: 'GET',
        };
      },
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS],
      staleTime: 10_000,
      keepUnusedDataFor: 120,
    }),
    consultaDiagnosticos: builder.query({
      query: (consultaId) =>
        `/consultas/consulta-diagnostico/diagnostico/${consultaId}`,
      transformResponse: (response) =>
        response?.data?.map((item) => item) ?? response,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.DIAGNOSTICOS],
    }),
    consultaDiagnostico: builder.query({
      query: (diagnosticoId) => `/consultas/consulta-diagnostico/${diagnosticoId}`,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS],
    }),
    consultaById: builder.query({
      query: (id) => `/consultas/${id}`,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS],
    }),

    consultasPorExpediente: builder.query({
      query: (id) => `/expedientes/consultas/${id}`,
      staleTime: 10_000,
      keepUnusedDataFor: 120,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS],
    }),

    //  GENERALES
    genero: builder.query({
      query: () => `/generales/sexo`,
      staleTime: 10_000,
      keepUnusedDataFor: 120,
    }),
    paises: builder.query({
      query: () => '/generales/paises',
      staleTime: 10_000,
      keepUnusedDataFor: 120,
    }),
    departamentos: builder.query({
      query: (paisId = 61) => ({
        url: '/generales/departamentos',
        params: { paisId },
      }),
    }),
    municipio: builder.query({
      query: (departamentoId) => ({
        url: `/generales/ciudades`,
        params: {
          departamentoId,
        },
      }),
    }),

    // MEDICOS CRUD
    crearMedico: builder.mutation({
      query: (body) => ({
        url: `/medico`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.MEDICOS],
    }),
    updateMedico: builder.mutation({
      query: ({ medicoId, ...body }) => {
        return {
          url: `/medico/${medicoId}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.MEDICOS],
    }),
    deleteMedico: builder.mutation({
      query: (id) => ({
        url: `/medico/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.MEDICOS],
    }),
    updateMedicoByConsulta: builder.mutation({
      query: ({ medicoId, consultaId }) => ({
        url: `/consultas/${consultaId}/medicos`,
        method: 'PATCH',
        body: { medicoId },
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.CONSULTAS],
    }),

    medicos: builder.query({
      query: (filter = null) => {
        const params = filter ? { search: filter } : {};
        return {
          url: `/medico`,
          params: {
            ...params,
            limit: 100,
          },
        };
      },
      staleTime: 10_000,
      keepUnusedDataFor: 120,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.MEDICOS],
      transformResponse: (response) => response.data?.map((item) => item),
    }),

    // ? ESPECIALIDADES
    especialidades: builder.query({
      query: () => ({
        url: `/especialidades`,
        params: {
          limit: 1_000,
        },
      }),
      transformResponse: (response) => response.data?.map((item) => item),
      staleTime: 10_000,
      keepUnusedDataFor: 120,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.ESPECIALIDADES],
    }),
    subEspecialidades: builder.query({
      query: () => ({
        url: `/sub-especialidades`,
        params: {
          limit: 1_000,
        },
      }),
      transformResponse: (response) => response.data?.map((item) => item),
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.SUB_ESPECIALIDAD],
    }),
    crearEspecialidad: builder.mutation({
      query: (body) => ({
        url: `/especialidades`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.ESPECIALIDADES],
    }),
    updateEspecialidad: builder.mutation({
      query: ({ id, ...body }) => {
        return {
          url: `/especialidades/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.ESPECIALIDADES],
    }),
    crearSubEspecialidad: builder.mutation({
      query: (body) => ({
        url: `/sub-especialidades`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.SUB_ESPECIALIDAD],
    }),
    updateSubEspecialidad: builder.mutation({
      query: ({ id, ...body }) => {
        return {
          url: `/sub-especialidades/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.SUB_ESPECIALIDAD],
    }),
    deleteSubEspecialidad: builder.mutation({
      query: (id) => ({
        url: `/sub-especialidades/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.SUB_ESPECIALIDAD],
    }),

    deleteEspecialidad: builder.mutation({
      query: (id) => ({
        url: `/especialidades/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.ESPECIALIDADES],
    }),
    // ?   agenda de citas
    dates: builder.query({
      query: ({ medicoId = null }) => {
        const params = medicoId ? { medicoId } : {};
        return {
          url: '/citas',
          params,
        };
      },
      staleTime: 10_000,
      keepUnusedDataFor: 120,
      providesTags: [PROVIDES_AND_INVALIDATE_TAGS.DATES],
    }),
    newDate: builder.mutation({
      query: (body) => ({
        url: '/citas',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.DATES],
    }),
    updateDate: builder.mutation({
      query: ({ dateId, body }) => ({
        url: `/citas/${dateId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [PROVIDES_AND_INVALIDATE_TAGS.DATES],
    }),
    statusDates: builder.query({
      query: (search = '') => {
        const params = search ? { search } : {};
        return {
          url: '/citas/estados',
          params: {
            ...params,
            limit: 100,
          },
        };
      },
      transformResponse: (response) => response.data,
      staleTime: 10_000,
      keepUnusedDataFor: 120,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useDeleteIncapcityMutation,
  useUpdateIncapacityMutation,
  useSaveIncapacityMutation,
  useSaveExpedientMutation,
  useSaveInterrogationMutation,
  useSavePerinatalDataMutation,
  useSavePathologicalDiseasesMutation,
  useSaveObstetricMutation,
  useSaveNoPathologicalDiseasesMutation,
  useSaveHereditaryMutation,
  useSaveGinecologicalMutation,
  useSaveFisicalExplorationMutation,
  useSaveAllergiesMutation,
  useLazyGetUsersQuery,
  useLazyGetSymptomsOfAllergiesQuery,
  useLazyGetRolesQuery,
  useLazyGetRelationShipToDiseasesQuery,
  useLazyGetRelationshipsQuery,
  useLazyGetProfessionsQuery,
  useLazyGetPeoplesQuery,
  useLazyGetPathologicalDiseasesQuery,
  useLazyGetModulesQuery,
  useLazyGetIdentityCardQuery,
  useLazyGetHereditaryDiseasesQuery,
  useLazyGetAllergicsQuery,
  useGetUsersQuery,
  useGetSymptomsOfAllergiesQuery,
  useGetSmookingDataQuery,
  useGetSexuallyTransmittedDiseasesQuery,
  useGetRolesQuery,
  useGetRelationShipToDiseasesQuery,
  useGetRelationshipsQuery,
  useGetProfessionsQuery,
  useGetPregnancyHistoryQuery,
  useGetPregnancyHistoryForFileQuery,
  useGetPerinatalDataQuery,
  useGetPeoplesQuery,
  useGetPathologicalDiseasesQuery,
  useGetPathologicalDiseasesForFileQuery,
  useGetObstetricDiseasesQuery,
  useGetObstetricDiseasesForFileQuery,
  useGetNoPathologicalDiseaseForFileQuery,
  useGetModulesQuery,
  useGetIncapacitiesQuery,
  useGetIdentityCardQuery,
  useGetHereditaryDiseasesQuery,
  useGetHereditariesForFileQuery,
  useGetGinecologicalForFileQuery,
  useGetForContraceptiveMethodsQuery,
  useGetFisicalExplorationForFileQuery,
  useGetEtsQuery,
  useGetDrugsQuery,
  useGetContraceptiveMethodsQuery,
  useGetComplicationsQuery,
  useGetClinicalRecordsQuery,
  useGetAllergiesForFileQuery,
  useGetAllergicsQuery,
  useGetAlcholismDataQuery,
  useGetInterrogationForFileQuery,
  useGetFolderByIdQuery,
  useGetFolderPeoplesQuery,
  useSeveritiesQuery,
  useGetDiagnosticsQuery,

  useDiagnosticosQuery,
  useCreateDiagnosticoMutation,
  useConsultasQuery,
  useConsultaDiagnosticosQuery,
  usePrescripcionByIdQuery,
  useUpdateDiagnosticoMutation,
  useDeleteDiagnosticoMutation,

  useLoginMutation,
  useConsultaByIdQuery,
  useConsultaDiagnosticoQuery,
  useConsultasPorExpedienteQuery,
  useUpdateConsultaMutation,
  useDeleteConsultaMutation,
  // generales
  useGeneroQuery,
  useLazyGeneroQuery,
  useDepartamentosQuery,
  useLazyDepartamentosQuery,
  usePaisesQuery,
  useLazyPaisesQuery,
  useLazyMunicipioQuery,
  useMunicipioQuery,

  // MEDICOS
  useMedicosQuery,
  useCrearMedicoMutation,
  useUpdateMedicoMutation,
  useDeleteMedicoMutation,
  useEspecialidadesQuery,
  useSubEspecialidadesQuery,
  useUpdateMedicoByConsultaMutation,
  useLazyMedicosQuery,
  useSearchConsultaByIdQuery,

  // ? AGENDA DE CITAS
  useDatesQuery,
  useStatusDatesQuery,
  useNewDateMutation,
  useUpdateDateMutation,

  //? especialidades
  useCrearEspecialidadMutation,
  useUpdateEspecialidadMutation,
  useDeleteEspecialidadMutation,

  //? sub especialidades
  useCrearSubEspecialidadMutation,
  useUpdateSubEspecialidadMutation,
  useDeleteSubEspecialidadMutation,
} = clinicalApi;
