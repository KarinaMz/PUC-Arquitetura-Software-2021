create schema MIC;

create table MIC.ENDERECO(
	EN_ID_ENDERECO  int not null identity(1,1) primary key,
	EN_CEP			varchar(10) not null,
	EN_CIDADE		varchar(100) not null,
	EN_ESTADO       varchar(100) not null,
	EN_BAIRRO		varchar(100),
	EN_LOGRADOURO	varchar(300) not null,
	EN_NUMERO		varchar(10),
	EN_COMPLEMENTO  varchar(100)
)


create table MIC.CLIENTE(
	CL_ID_CLIENTE	int not null identity(1,1) primary key,
	CL_CNPJ			varchar(14) not null,
	CL_RAZAO_SOCIAL varchar(200) not null,
	CL_TELEFONE		varchar(15),
	CL_EMAIL		varchar(100),
	EN_ID_ENDERECO	int 
)

alter table MIC.CLIENTE add constraint FK_CL_EN foreign key (EN_ID_ENDERECO)
references MIC.ENDERECO (EN_ID_ENDERECO);

create table MIC.MERCADORIA(
	ME_ID_MERCADORIA int not null identity(1,1) primary key,
	ME_NOME			varchar(200) not null,
	ME_CODIGO		varchar(50),
	ME_DESCRICAO	varchar(1000),
	ME_TIPO			varchar(20),
	CL_ID_CLIENTE   int
)

alter table MIC.MERCADORIA add constraint FK_ME_CL foreign key (CL_ID_CLIENTE)
references MIC.CLIENTE (CL_ID_CLIENTE);

create table MIC.DEPOSITO(
	DE_ID_DEPOSITO int not null identity(1,1) primary key,
	DE_CODIGO  varchar(50),
	EN_ID_ENDERECO int not null,
	DE_TELEFONE	   varchar(15)
)

alter table MIC.DEPOSITO add constraint FK_DE_EN foreign key (EN_ID_ENDERECO)
references MIC.ENDERECO (EN_ID_ENDERECO);

create table MIC.REGISTRO_MERCADORIA(
	RM_ID_REGISTRO_MERCADORIA int not null identity(1,1) primary key,
	RM_CODIGO varchar(15) not null,
	ME_ID_MERCADORIA int not null,
	DE_ID_DEPOSITO  int not null,
	EN_ID_ENDERECO int not null,
	RM_STATUS varchar(15) not null,
	RM_DATA_ENTREGA datetime2,
	RM_QUANTIDADE   int not null,
	US_ID_USUARIO int
)

alter table MIC.REGISTRO_MERCADORIA add constraint FK_RM_DE foreign key (DE_ID_DEPOSITO)
references MIC.DEPOSITO (DE_ID_DEPOSITO);
alter table MIC.REGISTRO_MERCADORIA add constraint FK_RM_ME foreign key (ME_ID_MERCADORIA)
references MIC.MERCADORIA (ME_ID_MERCADORIA);
alter table MIC.REGISTRO_MERCADORIA add constraint FK_RM_US foreign key (US_ID_USUARIO)
references MIC.USUARIO (US_ID_USUARIO);

create table MIC.HISTORICO_DEPOSITO(
    HD_ID_HISTORICO_DEPOSITO int not null identity(1,1) primary key,
    RM_ID_REGISTRO_MERCADORIA int not null,
    HD_DATA_HORA datetime2 not null,
	DE_ID_DEPOSITO  int not null,
	US_ID_USUARIO int not null
)

alter table MIC.HISTORICO_DEPOSITO add constraint FK_HD_DE foreign key (DE_ID_DEPOSITO)
references MIC.DEPOSITO (DE_ID_DEPOSITO);
alter table MIC.HISTORICO_DEPOSITO add constraint FK_HD_US foreign key (US_ID_USUARIO)
references MIC.USUARIO (US_ID_USUARIO);
alter table MIC.HISTORICO_DEPOSITO add constraint FK_HD_RM foreign key (RM_ID_REGISTRO_MERCADORIA)
references MIC.REGISTRO_MERCADORIA (RM_ID_REGISTRO_MERCADORIA);

create table MIC.USUARIO(
	US_ID_USUARIO int not null identity(1,1) primary key,
	US_LOGIN varchar(200) not null,
	US_NOME  varchar(200) not null,
	US_SENHA varchar(200) not null,
	US_PERFIL	   varchar(10),
	CL_ID_CLIENTE   int
)

alter table MIC.USUARIO add constraint FK_US_CL foreign key (CL_ID_CLIENTE)
references MIC.CLIENTE (CL_ID_CLIENTE);