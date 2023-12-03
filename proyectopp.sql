--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
create database practicas_profesionales;
\connect practicas_profesionales;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- Name: administrador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administrador (
    correo character varying(25) NOT NULL,
    pass_adm character varying(20) NOT NULL,
    nombre_adm text NOT NULL,
    adm_app text NOT NULL,
    adm_apm text NOT NULL
);


ALTER TABLE public.administrador OWNER TO postgres;

--
-- Name: alumno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alumno (
    matricula character varying(10) NOT NULL,
    correo_institucional varchar(50) NOT NULL,
    correo_recuperacion varchar(50) NOT NULL,
    nombre_a text NOT NULL,
    a_app text NOT NULL,
    a_apm text NOT NULL,
    semestre integer NOT NULL,
    grupo text NOT NULL,
    pass_alu character varying(20) NOT NULL
);


ALTER TABLE public.alumno OWNER TO postgres;

--
-- Name: detalle_p; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_p (
    id_practica_fk integer NOT NULL,
    consecutivo integer NOT NULL,
    estado_p text NOT NULL
);


ALTER TABLE public.detalle_p OWNER TO postgres;

--
-- Name: detalle_p_consecutivo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_p_consecutivo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalle_p_consecutivo_seq OWNER TO postgres;

--
-- Name: detalle_p_consecutivo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_p_consecutivo_seq OWNED BY public.detalle_p.consecutivo;


--
-- Name: detalle_p_id_practica_fk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_p_id_practica_fk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalle_p_id_practica_fk_seq OWNER TO postgres;

--
-- Name: detalle_p_id_practica_fk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_p_id_practica_fk_seq OWNED BY public.detalle_p.id_practica_fk;


--
-- Name: empresa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empresa (
    id_empresa integer NOT NULL,
    nombre_e text NOT NULL,
    direccion text NOT NULL,
    nom_res text NOT NULL,
    res_ap text NOT NULL
);


ALTER TABLE public.empresa OWNER TO postgres;

--
-- Name: empresa_id_empresa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empresa_id_empresa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.empresa_id_empresa_seq OWNER TO postgres;

--
-- Name: empresa_id_empresa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empresa_id_empresa_seq OWNED BY public.empresa.id_empresa;


--
-- Name: practicas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.practicas (
    id_practica integer NOT NULL,
    id_empresa_fk integer NOT NULL,
    matricula_fk character varying(10),
    proyecto text NOT NULL,
    numpractica integer NOT NULL,
    f_inicio date NOT NULL,
    f_fin date NOT NULL,
    horas integer NOT NULL
);


ALTER TABLE public.practicas OWNER TO postgres;

--
-- Name: practicas_id_empresa_fk_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.practicas_id_empresa_fk_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.practicas_id_empresa_fk_seq OWNER TO postgres;

--
-- Name: practicas_id_empresa_fk_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.practicas_id_empresa_fk_seq OWNED BY public.practicas.id_empresa_fk;


--
-- Name: practicas_id_practica_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.practicas_id_practica_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.practicas_id_practica_seq OWNER TO postgres;

--
-- Name: practicas_id_practica_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.practicas_id_practica_seq OWNED BY public.practicas.id_practica;


--
-- Name: detalle_p id_practica_fk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_p ALTER COLUMN id_practica_fk SET DEFAULT nextval('public.detalle_p_id_practica_fk_seq'::regclass);


--
-- Name: detalle_p consecutivo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_p ALTER COLUMN consecutivo SET DEFAULT nextval('public.detalle_p_consecutivo_seq'::regclass);


--
-- Name: empresa id_empresa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa ALTER COLUMN id_empresa SET DEFAULT nextval('public.empresa_id_empresa_seq'::regclass);


--
-- Name: practicas id_practica; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.practicas ALTER COLUMN id_practica SET DEFAULT nextval('public.practicas_id_practica_seq'::regclass);


--
-- Name: practicas id_empresa_fk; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.practicas ALTER COLUMN id_empresa_fk SET DEFAULT nextval('public.practicas_id_empresa_fk_seq'::regclass);


--
-- Data for Name: administrador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.administrador (correo, pass_adm, nombre_adm, adm_app, adm_apm) FROM stdin;
\


--
-- Data for Name: alumno; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alumno (matricula, nombre_a, a_app, a_apm, semestre, grupo, pass_alu) FROM stdin;
\.


--
-- Data for Name: detalle_p; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_p (id_practica_fk, consecutivo, estado_p) FROM stdin;
\.


--
-- Data for Name: empresa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empresa (id_empresa, nombre_e, direccion, nom_res, res_ap) FROM stdin;
\.


--
-- Data for Name: practicas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.practicas (id_practica, id_empresa_fk, matricula_fk, proyecto, numpractica, f_inicio, f_fin, horas) FROM stdin;
\.


--
-- Name: detalle_p_consecutivo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_p_consecutivo_seq', 1, false);


--
-- Name: detalle_p_id_practica_fk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_p_id_practica_fk_seq', 1, false);


--
-- Name: empresa_id_empresa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empresa_id_empresa_seq', 1, false);


--
-- Name: practicas_id_empresa_fk_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.practicas_id_empresa_fk_seq', 1, false);


--
-- Name: practicas_id_practica_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.practicas_id_practica_seq', 1, false);


--
-- Name: administrador administrador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_pkey PRIMARY KEY (correo);


--
-- Name: alumno alumno_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alumno
    ADD CONSTRAINT alumno_pkey PRIMARY KEY (matricula);


--
-- Name: detalle_p detalle_p_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_p
    ADD CONSTRAINT detalle_p_pkey PRIMARY KEY (consecutivo);


--
-- Name: empresa empresa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa
    ADD CONSTRAINT empresa_pkey PRIMARY KEY (id_empresa);


--
-- Name: practicas practicas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.practicas
    ADD CONSTRAINT practicas_pkey PRIMARY KEY (id_practica);


--
-- Name: detalle_p detalle_fk_practica; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_p
    ADD CONSTRAINT detalle_fk_practica FOREIGN KEY (id_practica_fk) REFERENCES public.practicas(id_practica);


--
-- Name: practicas practicas_fk_alumno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.practicas
    ADD CONSTRAINT practicas_fk_alumno FOREIGN KEY (matricula_fk) REFERENCES public.alumno(matricula);


--
-- Name: practicas practicas_fk_empresa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.practicas
    ADD CONSTRAINT practicas_fk_empresa FOREIGN KEY (id_empresa_fk) REFERENCES public.empresa(id_empresa);


--
-- PostgreSQL database dump complete
--

