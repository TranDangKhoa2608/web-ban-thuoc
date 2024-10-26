--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

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

SET default_table_access_method = heap;

--
-- Name: tb_cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_cart (
    cartid bigint NOT NULL,
    medicineid bigint,
    quantity integer NOT NULL,
    total_price double precision,
    userid bigint
);


ALTER TABLE public.tb_cart OWNER TO postgres;

--
-- Name: tb_cart_cartid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_cart ALTER COLUMN cartid ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tb_cart_cartid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tb_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_categories (
    categoryid bigint NOT NULL,
    description character varying(255),
    name character varying(255)
);


ALTER TABLE public.tb_categories OWNER TO postgres;

--
-- Name: tb_categories_categoryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_categories ALTER COLUMN categoryid ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tb_categories_categoryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tb_invoice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_invoice (
    invoiceid integer NOT NULL,
    add_code character varying(255),
    full_name character varying(255),
    order_date timestamp(6) without time zone,
    price double precision,
    orderid bigint
);


ALTER TABLE public.tb_invoice OWNER TO postgres;

--
-- Name: tb_invoice_invoiceid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_invoice ALTER COLUMN invoiceid ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tb_invoice_invoiceid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tb_medicine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_medicine (
    medicineid bigint NOT NULL,
    categoryid bigint NOT NULL,
    description character varying(10000),
    dis_price double precision,
    image_url character varying(255),
    medicine_name character varying(255),
    origin character varying(255),
    price double precision,
    quantity integer NOT NULL
);


ALTER TABLE public.tb_medicine OWNER TO postgres;

--
-- Name: tb_medicine_medicineid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_medicine ALTER COLUMN medicineid ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tb_medicine_medicineid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tb_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_order (
    orderid bigint NOT NULL,
    code_order character varying(255),
    order_date character varying(255),
    paymentid character varying(255) NOT NULL,
    status character varying(255),
    total_price double precision,
    userid bigint
);


ALTER TABLE public.tb_order OWNER TO postgres;

--
-- Name: tb_order_orderid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_order ALTER COLUMN orderid ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tb_order_orderid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tb_orderdetail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_orderdetail (
    order_detailid bigint NOT NULL,
    medicineid bigint,
    orderid bigint,
    price double precision,
    quantity integer NOT NULL,
    status character varying(255)
);


ALTER TABLE public.tb_orderdetail OWNER TO postgres;

--
-- Name: tb_orderdetail_order_detailid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_orderdetail ALTER COLUMN order_detailid ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tb_orderdetail_order_detailid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tb_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_user (
    userid bigint NOT NULL,
    address character varying(255),
    email character varying(255),
    fullname character varying(255),
    password character varying(255),
    phone character varying(255),
    username character varying(255)
);


ALTER TABLE public.tb_user OWNER TO postgres;

--
-- Name: tb_user_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tb_user ALTER COLUMN userid ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.tb_user_userid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: tb_cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_cart (cartid, medicineid, quantity, total_price, userid) VALUES
(3, 2, 3, 6000, 1),
(2, 1, 5, 5000, 1);


--
-- Data for Name: tb_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_categories (categoryid, description, name) VALUES
(1, 'Thuốc Giảm đau cho các cơn đau đầu, sốt, nóng....', 'Thuốc Giảm Đau'),
(2, 'Thuốc giúp điều trị nhiễm trùng vv.', 'Thuốc Kháng Sinh'),
(3, 'Thuốc Trị đau bụng', 'Thuốc Đau Bụng');

--
-- Data for Name: tb_invoice; Type: TABLE DATA; Schema: public; Owner: postgres
--

--
-- Data for Name: tb_medicine; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_medicine (medicineid, categoryid, description, dis_price, image_url, medicine_name, origin, price, quantity) VALUES
(1, 1, 'Thuốc Panadol giảm đau', 1, '20241023_131447_extra.png', 'Panadol Extra', 'Việt Nam', 1000, 1000),
(2, 1, 'Thuốc Giảm đau', 0, '20241023_131656_hapacol.png', 'Hapacol', 'Việt Nam', 2000, 1000),
(3, 2, 'Thuốc kháng sinh', 0, '20241023_132020_panasonic.png', 'Panasonic', 'Việt Nam', 3000, 100),
(4, 3, 'Thuốc trị đau bung', 0, '20241023_202649_thuoctribenh.png', 'Panasonic11', 'Việt Nam', 1000, 1000),
(5, 2, 'Thuốc kháng siinh', 1, '20241023_203253_thuockhangsinh.png', 'Astromamwl', 'Việt Nam', 3000, 1000),
(6, 1, 'Thuốc giảm đau', 0, '20241023_203354_hapacol.png', 'Hapacol 1', 'Việt Nam', 500, 1000);

--
-- Data for Name: tb_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_order (orderid, code_order, order_date, paymentid, status, total_price, userid) VALUES
(1, 'X3V7H62DM6', '20241023_174811', '1', '3', 12000, 1),
(2, 'SJU7Q6CFQC', '20241023_175324', '1', '3', 8000, 1),
(3, 'MOKGJGJ354', '20241023_181321', '1', '2', 75000, 1),
(4, 'BVCODKXD6S', '20241023_204235', '1', '1', 43000, 1);

--
-- Data for Name: tb_orderdetail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_orderdetail (order_detailid, medicineid, orderid, price, quantity, status) VALUES
(1, 2, 1, 4000, 2, NULL),
(2, 1, 1, 2000, 2, NULL),
(3, 2, 2, 4000, 2, NULL),
(4, 2, 3, 10000, 5, NULL),
(5, 1, 3, 5000, 5, NULL),
(6, 1, 4, 5000, 5, NULL),
(7, 2, 4, 6000, 3, NULL);

--
-- Data for Name: tb_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tb_user (userid, address, email, fullname, password, phone, username) VALUES
(1, 'Tháp mười Đồng Tháp, Cổng trời 22', 'nguyenvana1@gmail.com', 'Nguyễn Văn A1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '02924232424231', 'nguyenvana'),
(2, 'Tháp mười Đồng Tháp, Cổng trời 23', 'nguyenvana2@gmail.com', 'Nguyễn Văn A2', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '02924232424232', 'nguyenvanb'),
(3, 'Tháp mười Đồng Tháp, Cổng trời 24', 'nguyenvana3@gmail.com', 'Nguyễn Văn A3', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '02924232424233', 'nguyenvanc'),
(4, 'Tháp mười Đồng Tháp, Cổng trời 25', 'nguyenvana4@gmail.com', 'Nguyễn Văn A4', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '02924232424234', 'nguyenvand');



--
-- Name: tb_cart_cartid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_cart_cartid_seq', 3, true);


--
-- Name: tb_categories_categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_categories_categoryid_seq', 3, true);


--
-- Name: tb_invoice_invoiceid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_invoice_invoiceid_seq', 1, false);


--
-- Name: tb_medicine_medicineid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_medicine_medicineid_seq', 6, true);


--
-- Name: tb_order_orderid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_order_orderid_seq', 4, true);


--
-- Name: tb_orderdetail_order_detailid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_orderdetail_order_detailid_seq', 7, true);


--
-- Name: tb_user_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_user_userid_seq', 1, true);


--
-- Name: tb_cart tb_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_cart
    ADD CONSTRAINT tb_cart_pkey PRIMARY KEY (cartid);


--
-- Name: tb_categories tb_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_categories
    ADD CONSTRAINT tb_categories_pkey PRIMARY KEY (categoryid);


--
-- Name: tb_invoice tb_invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_invoice
    ADD CONSTRAINT tb_invoice_pkey PRIMARY KEY (invoiceid);


--
-- Name: tb_medicine tb_medicine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_medicine
    ADD CONSTRAINT tb_medicine_pkey PRIMARY KEY (medicineid);


--
-- Name: tb_order tb_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_order
    ADD CONSTRAINT tb_order_pkey PRIMARY KEY (orderid);


--
-- Name: tb_orderdetail tb_orderdetail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_orderdetail
    ADD CONSTRAINT tb_orderdetail_pkey PRIMARY KEY (order_detailid);


--
-- Name: tb_user tb_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_user
    ADD CONSTRAINT tb_user_pkey PRIMARY KEY (userid);


--
-- Name: tb_orderdetail fk7hwkmfx6pwcmxhug3nn832hjv; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_orderdetail
    ADD CONSTRAINT fk7hwkmfx6pwcmxhug3nn832hjv FOREIGN KEY (medicineid) REFERENCES public.tb_medicine(medicineid);


--
-- Name: tb_cart fkapmtk0yworcadvo3r1v2hjxdw; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_cart
    ADD CONSTRAINT fkapmtk0yworcadvo3r1v2hjxdw FOREIGN KEY (medicineid) REFERENCES public.tb_medicine(medicineid);


--
-- Name: tb_order fke5krmbia4gxi4l434pmj5xl1h; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_order
    ADD CONSTRAINT fke5krmbia4gxi4l434pmj5xl1h FOREIGN KEY (userid) REFERENCES public.tb_user(userid);


--
-- Name: tb_medicine fkhi3xuvjkway55f31asml9eolf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_medicine
    ADD CONSTRAINT fkhi3xuvjkway55f31asml9eolf FOREIGN KEY (categoryid) REFERENCES public.tb_categories(categoryid);


--
-- Name: tb_orderdetail fksenljd6teqsrkvdxj5l703egp; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_orderdetail
    ADD CONSTRAINT fksenljd6teqsrkvdxj5l703egp FOREIGN KEY (orderid) REFERENCES public.tb_order(orderid);


--
-- Name: tb_cart fkt7cc984tyjdk10d5l3embtiua; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_cart
    ADD CONSTRAINT fkt7cc984tyjdk10d5l3embtiua FOREIGN KEY (userid) REFERENCES public.tb_user(userid);


--
-- PostgreSQL database dump complete
--

