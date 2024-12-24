--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: candidat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.candidat (
    id_candidat uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nom_prenom character varying,
    mail character varying NOT NULL,
    num_tel character varying,
    code character varying
);


ALTER TABLE public.candidat OWNER TO postgres;

--
-- Name: cv; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cv (
    id_cv uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    date_insertion date,
    cv_text text,
    cv_pretraite text,
    competences text,
    experience text,
    resume_cv character varying(50),
    commitment character varying,
    "disponibilité" character varying(50),
    exp_salaire integer,
    domaine_etude character varying(50),
    id_candidat uuid NOT NULL
);


ALTER TABLE public.cv OWNER TO postgres;

--
-- Name: entretien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entretien (
    id_entretien uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.entretien OWNER TO postgres;

--
-- Name: offre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offre (
    id_offre uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    titre character varying(50),
    description text NOT NULL,
    description_pretraite text,
    type_contrat character varying(50),
    revenu integer,
    link_interview text,
    google_form text,
    societe character varying(50),
    kano character varying(50)
);


ALTER TABLE public.offre OWNER TO postgres;

--
-- Name: resultat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resultat (
    id_cv uuid NOT NULL,
    id_offre uuid NOT NULL,
    score_similarite numeric,
    note_entretien numeric
);


ALTER TABLE public.resultat OWNER TO postgres;

--
-- Data for Name: candidat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.candidat (id_candidat, nom_prenom, mail, num_tel, code) FROM stdin;
\.


--
-- Data for Name: cv; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cv (id_cv, date_insertion, cv_text, cv_pretraite, competences, experience, resume_cv, commitment, "disponibilité", exp_salaire, domaine_etude, id_candidat) FROM stdin;
\.


--
-- Data for Name: entretien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entretien (id_entretien) FROM stdin;
\.


--
-- Data for Name: offre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offre (id_offre, titre, description, description_pretraite, type_contrat, revenu, link_interview, google_form, societe, kano) FROM stdin;
\.


--
-- Data for Name: resultat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resultat (id_cv, id_offre, score_similarite, note_entretien) FROM stdin;
\.


--
-- Name: candidat candidat_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidat
    ADD CONSTRAINT candidat_code_key UNIQUE (code);


--
-- Name: candidat candidat_mail_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidat
    ADD CONSTRAINT candidat_mail_key UNIQUE (mail);


--
-- Name: candidat candidat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidat
    ADD CONSTRAINT candidat_pkey PRIMARY KEY (id_candidat);


--
-- Name: cv cv_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv
    ADD CONSTRAINT cv_pkey PRIMARY KEY (id_cv);


--
-- Name: entretien entretien_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entretien
    ADD CONSTRAINT entretien_pkey PRIMARY KEY (id_entretien);


--
-- Name: offre offre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offre
    ADD CONSTRAINT offre_pkey PRIMARY KEY (id_offre);


--
-- Name: resultat resultat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultat
    ADD CONSTRAINT resultat_pkey PRIMARY KEY (id_cv, id_offre);


--
-- Name: cv cv_id_candidat_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cv
    ADD CONSTRAINT cv_id_candidat_fkey FOREIGN KEY (id_candidat) REFERENCES public.candidat(id_candidat);


--
-- Name: resultat resultat_id_cv_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultat
    ADD CONSTRAINT resultat_id_cv_fkey FOREIGN KEY (id_cv) REFERENCES public.cv(id_cv);


--
-- Name: resultat resultat_id_offre_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultat
    ADD CONSTRAINT resultat_id_offre_fkey FOREIGN KEY (id_offre) REFERENCES public.offre(id_offre);


--
-- PostgreSQL database dump complete
--

