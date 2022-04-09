INSERT INTO MIC.ENDERECO(EN_CEP, EN_CIDADE, EN_ESTADO, EN_BAIRRO, EN_LOGRADOURO, EN_NUMERO, EN_COMPLEMENTO)
VALUES ('35701090', 'Sete Lagoas', 'Minas Gerais', 'Progresso', 'Rua São Pedro', '245', null),
('69312335', 'Boa Vista', 'Roraima', 'Cinturão Verde', 'Rua São Leopoldo', '109', null),
('69015010', 'Colônia Terra Nova', 'Amazonas', 'Manaus', 'Rua Bom Jesus', '8', 'nº10'),
('65905502', 'Imperatriz', 'Maranhão', 'Sol Nascente', 'Travessa São João', '22', null),
('79092288', 'Campo Grande', 'Mato Grosso do Sul', 'Vila Flório', 'Rua Aldair Duarte Vaz', '1026', null),
('29045300', 'Vitória', 'Espirito Santo', 'Santa Luíza', 'Rua José Farias', '59', null),
('39401636', 'Montes Claros', 'Minas Gerais', 'Amazonas', 'Rua Maria de Freitas', '95', null),
('68906483', 'Macapá', 'Amapá', 'Marabaixo', 'Passagem Bom Jardin', '508', 'subsolo'),
('59150230', 'Parnamirim', 'Rio Grande do Norte', 'Nova Parnamirim', 'Rua dos Curiós', '87', null),
('49540971', 'Nossa Senhora Aparecida', 'Sergipe', 'Centro', 'Avenida Tiradentes', '550', null),
('57038645', 'Maceió', 'Alagoas', 'Jacarecica', 'Vila Emater', '617', null),
('69553370', 'Tefé', 'Amazonas', 'São João', 'Rua Moacir Veiga da Gama', '186', null),
('32042370', 'Contagem', 'Minas Gerais', 'Alvorada', 'Rua João Batista Costa Pio', '778', null),
('69084042', 'Manaus', 'Amazonas', 'Zumbi dos Palmares', 'Rua Patauá', '658', null),
('75143580', 'Anápolis', 'Goiás', 'Jardim Suíço', 'Rua Hamburgo', '40', 'loja 13');

INSERT INTO MIC.CLIENTE (CL_CNPJ,CL_RAZAO_SOCIAL, CL_TELEFONE, CL_EMAIL,EN_ID_ENDERECO)
VALUES ('64695683000121', 'Eletrônica ME', '1136371928', 'eletronicame@gmail.com', 1),
('67254246000160', 'Lojas Americanas', '1137433244', 'contato@americanas.com.br', 2),
('47795554000196', 'C&A', '3339884063', 'cea@gmail.com', 3),
('90374272000144', 'Mercado São Pedro', '28880969126', 'saopedro@email.com.br', 4),
('26667940000122', 'Gelo & Água S.A.', '80687796880', 'suporte@geloagua.com.br', 5),
('62770988000125', 'Móveis Madeira', '58893469458', 'madeira@contato.com.br', 6),
('93469368000184', 'Hortifruti', '88371566812', 'hortifruti@gmail.com', 7),
('48896720000103', 'Casa Decor', '71852008434', 'casa.decor@suporte.com.br', 8),
('01586518000111', 'Pão de Açúcar', '44387930690', 'pao@acucar.com.br', 9),
('28303140000158', 'Magazine Luiza', '65347623472', 'contato@magazineluiza.com.br', 10),
('23547489000111', 'Casas Pernambucanas', '25252124548', 'pernambucanas@suporte.com.br', 11),
('91375770000174', 'Drogasil', '37563980751', 'drogasil@email.com.br', 12),
('38831430000128', 'Renner', '76228858109', 'renner-contac@gmail.com', 13),
('32283789000121', 'Hering', '35419822276', 'hering@lojas.com.br', 14),
('94582519000179', 'Drogaria Venancio', '39414026742', 'transporte@venancio.com.br', 15);

INSERT INTO MIC.MERCADORIA (ME_NOME, ME_CODIGO, ME_DESCRICAO, ME_TIPO, CL_ID_CLIENTE) VALUES
('Saco De Gelo Em Cubos - 1 Kg', '2350216004', 'Saco de gelo em cubos da marca Qualitá. Água potável. 1Kg', 'FRIGORIFICO', 5),
('Gelo Seco Em Isopor', '9206243278', 'Gelo seco de alta qualidade', 'FRIGORIFICO', 5),
('Galão de Água Mineral de 20 Litros', '3946877711', 'Galão de 20 litros da marca Hydrate', 'LIQUIDO', 5),
('Garrafa Água Mineral 500ml – Pacote 12un.', '2350216004', 'Pacote com 12 garrafas de água de 500ml da marca Minalba.', 'LIQUIDO', 5),
('Copo de Água Mineral de 200 ml - 48un.', '3933903602', 'Pacote com 48 copinhos de água de 200ml.', 'LIQUIDO', 5),
('Jogo de Panelas Tramontina', '1338946138', 'Jogo de panelas 7 peças alumínio cereja', 'GERAL', 2),
('Notebook Samsung Book Intel Core i5-1135G7', '3081358898', 'Notebook Samsung Book Intel Core i5-1135G7 8GB 256GB SSD (Intel Iris Xe) W10 FHD 15.6 Cinza Chumbo NP550XDA-KF2BR', 'GERAL', 2),
('conjunto infantil de regata azul', '8449113542', 'Conjunto infantil masculino confeccionado em malha.', 'GERAL', 3),
('Escrivaninha MDF Marrom escuro', '1174565123', 'Escrivaninha com 3 gavetas 120x45cm', 'GERAL', 6),
('Mesa Gamer Desk Black', '2585918294', 'Mesa gamer 178x54cm com Pintura UV e design moderno.', 'GERAL', 6),
('Cadeira giratória presidente', '3946877711', '', 'GERAL', 6),
('iPhone 12 64GB', '7655356825', 'iPhone 12 Apple 64GB - Verde', 'GERAL', 10),
('Monitor Led 24 polegadas LG', '8075774112', 'Monitor Led 24 LG IPS Full HD HDMI', 'GERAL', 10),
('Banana prata 19kg', '9492200002', 'caixa de banana prata 19kg', 'FRIGORIFICO', 7),
('Sabonete Nivea', '1021665379', '', 'GERAL', 12);

INSERT INTO MIC.ENDERECO(EN_CEP, EN_CIDADE, EN_ESTADO, EN_BAIRRO, EN_LOGRADOURO, EN_NUMERO, EN_COMPLEMENTO)
VALUES ('13056182', 'Campinas', 'São Paulo', 'Jardim São Pedro de Viracopos', 'Rua Paulo Hipólito Correia', '525', null),
('04153160', 'São Paulo', 'São Paulo', 'Vila Santo Estéfano', 'Avenida Embaixador Álvaro Lins', '785', null),
('39765970', 'Paulistas', 'Minas Gerais', 'Centro', 'Rua Bias Fortes', '48', 'nº169'),
('35703232', 'Sete Lagoas', 'Minas Gerais', 'Santa Felicidade', 'Rua José Luiz da Silva', '223', null);

INSERT INTO MIC.DEPOSITO (DE_CODIGO, EN_ID_ENDERECO, DE_TELEFONE) VALUES
('DEPSP-5', 16, '1936157370'),
('DEPSP-63', 17, '1127571286'),
('DEPMG-4', 18, '3336274459'),
('DEPMG-11', 19, '3137048883');

INSERT INTO MIC.ENDERECO(EN_CEP, EN_CIDADE, EN_ESTADO, EN_BAIRRO, EN_LOGRADOURO, EN_NUMERO, EN_COMPLEMENTO)
VALUES ('35660251', 'Pará de Minas', 'Minas Gerais', 'Distrito Industrial Antônio Júlio de Faria', 'Avenida Olavo dos Santos', '177', null),
('59139060', 'Natal', 'Rio Grande do Norte', 'Lagoa Azul', 'Rua do João Redondo', '418', null);

INSERT INTO MIC.REGISTRO_MERCADORIA (RM_CODIGO, ME_ID_MERCADORIA, DE_ID_DEPOSITO, EN_ID_ENDERECO, RM_STATUS, RM_DATA_ENTREGA, RM_QUANTIDADE) VALUES
('KJ97XAKM474HTHK', 1, 1, 28, 'EM_TRANSITO', null, 550),
('G12MUTF749KYDN9', 1, 2, 29, 'EM_TRANSITO', null, 1000);

INSERT INTO MIC.USUARIO (US_LOGIN, US_NOME, US_SENHA, US_PERFIL, CL_ID_CLIENTE) VALUES
('admin', 'Administrador', '$2a$10$w7jWrBQefBQ9ZX3w4FrykudPpakF8qjw1P/0TNo2ibaKBNDtwbsz.', 'ADMIN', null),
('joao', 'João Silva', '$2a$10$YjU4QVsYi4271rP9ph8leOVynpSD.7A1NoQGDIYHHVRQn2Kafc7y.', 'CLIENTE', 5);