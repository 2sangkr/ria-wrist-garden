-- Artists
INSERT INTO artists (id, slug, name, tags, bio, profile_color, is_empty, sort_order) VALUES
('1', 'dhee', 'D.hee', ARRAY['#핸드메이드', '#드로잉', '#일러스트'], '손으로 직접 만드는 책갈피.', '#f4c2c2', false, 1),
('2', 'james', 'James', ARRAY['#레고', '#모형', '#조립'], '레고로 만드는 정밀한 세계.', '#a8c8f0', false, 2),
('3', 'emma', 'Emma', ARRAY['#아크릴', '#회화', '#동물'], '따뜻한 색으로 세상을 그려요.', '#f5c842', false, 3);

-- D.hee Works
INSERT INTO works (artist_id, slug, title, image, materials, created_at, age) VALUES
('1', 'work-1', '책갈피', '/images/dhee-work-1b.jpg', ARRAY['종이', '리본', '수작업 마감'], '2026-04-29', 12),
('1', 'work-2', '키링', '/images/dhee-work-2.jpg', ARRAY['종이', '리본', '수작업 마감'], '2026-04-29', 12),
('1', 'work-5', '이모지 얼굴들', '/images/dhee-work-5.jpg', ARRAY['마커', '색연필', '스케치북'], '2026-04-29', 12),
('1', 'work-6', '미키 & 미니', '/images/dhee-work-6.jpg', ARRAY['마커', '색연필', '스케치북'], '2026-04-29', 12),
('1', 'work-7', '달리는 말', '/images/dhee-work-7.jpg', ARRAY['연필', '도화지'], '2026-04-29', 12),
('1', 'work-8', '퍼핀', '/images/dhee-work-8.jpg', ARRAY['연필', '도화지'], '2026-04-29', 12),
('1', 'work-9', '동물 스케치 — 고양이와 코끼리', '/images/dhee-work-9.jpg', ARRAY['연필', '도화지'], '2026-04-29', 12),
('1', 'work-12', '머리카락 스케치', '/images/dhee-work-12.jpg', ARRAY['연필', '스케치북'], '2026-04-29', 12),
('1', 'work-13', '눈 드로잉', '/images/dhee-work-13.jpg', ARRAY['연필', '스케치북'], '2026-04-29', 12),
('1', 'work-15', '애니 소녀 스케치 1', '/images/dhee-work-15.jpg', ARRAY['연필', '스케치북'], '2026-04-29', 12),
('1', 'work-16', '애니 소녀 스케치 2', '/images/dhee-work-16.jpg', ARRAY['연필', '스케치북'], '2026-04-29', 12),
('1', 'work-17', '펜 드로잉', '/images/dhee-work-17.jpg', ARRAY['펜', '도화지'], '2026-04-29', 12),
('1', 'work-18', '카드 지갑', '/images/dhee-work-18.jpg', ARRAY['코바늘', '실'], '2026-05-01', 12),
('1', 'work-20', '네잎크로버 (핑크)', '/images/dhee-work-20.jpg', ARRAY['코바늘', '실'], '2026-05-01', 12),
('1', 'work-22', '축하드려요', '/images/dhee-work-22.jpg', ARRAY['코바늘', '실'], '2026-05-03', 12),
('1', 'work-25', 'HARIBO', '/images/dhee-work-25.jpg', ARRAY['종이접기', '색종이', '수제 패키지'], '2026-05-01', 12),
('1', 'work-26', '무지개 캔버스', '/images/dhee-work-26.jpg', ARRAY['아크릴 물감', '캔버스'], '2025-01-01', 11),
('1', 'work-27', '파랑', '/images/dhee-work-27.jpg', ARRAY['아크릴 물감', '캔버스'], '2025-01-01', 11),
('1', 'work-28', '지붕 위의 고양이', '/images/dhee-work-28.jpg', ARRAY['아크릴 물감', '캔버스'], '2025-09-27', 11),
('1', 'work-29', '바다 노을', '/images/dhee-work-29.jpg', ARRAY['아크릴 물감', '캔버스'], '2025-01-01', 11),
('1', 'work-30', '달밤', '/images/dhee-work-30.jpg', ARRAY['아크릴 물감', '캔버스'], '2025-01-01', 11),
('1', 'work-31', '레몬', '/images/dhee-work-31.jpg', ARRAY['아크릴 물감', '캔버스'], '2025-10-25', 11),
('1', 'work-32', '노을 속 돛단배', '/images/dhee-work-32.jpg', ARRAY['아크릴 물감', '캔버스'], '2025-01-01', 11),
('1', 'work-21', '녹아내리는 도시', '/images/dhee-work-21.jpg', ARRAY['아크릴 물감', '캔버스'], '2023-01-01', 9),
('1', 'work-23', '분홍 골목', '/images/dhee-work-23.jpg', ARRAY['아크릴 물감', '캔버스'], '2023-01-01', 9),
('1', 'work-24', '숲의 반짝임', '/images/dhee-work-24.jpg', ARRAY['아크릴 물감', '캔버스'], '2023-01-01', 9);

-- James Works
INSERT INTO works (artist_id, slug, title, image, materials, created_at, age) VALUES
('2', 'work-2', '페라리 488 GTB', '/images/whee-work-2.jpg', ARRAY['레고'], '2021-01-01', 8),
('2', 'work-3', '사무라이', '/images/whee-work-3.jpg', ARRAY['레고'], '2021-01-01', 8),
('2', 'work-4', '기사도', '/images/whee-work-4.jpg', ARRAY['레고'], '2021-01-01', 8),
('2', 'work-5', '아바타', '/images/whee-work-5.jpg', ARRAY['레고'], '2021-01-01', 8),
('2', 'work-6', '건담', '/images/whee-work-6.jpg', ARRAY['종이접기'], '2021-01-01', 8),
('2', 'work-1', '2017년형 포드 F-150 랩터', '/images/whee-work-1.jpg', ARRAY['레고'], '2026-05-01', 13);

-- Emma Works
INSERT INTO works (artist_id, slug, title, image, materials, created_at, age) VALUES
('3', 'work-1', '꿈꾸는 고양이', '/images/rhee-work-1.jpg', ARRAY['아크릴 물감', '캔버스'], '2023-01-01', 9),
('3', 'work-2', '맛있겠다', '/images/rhee-work-2.jpg', ARRAY['아크릴 물감', '캔버스'], '2023-01-01', 9),
('3', 'work-3', '부풀어오르는 집', '/images/rhee-work-3.jpg', ARRAY['아크릴 물감', '캔버스'], '2023-01-01', 9),
('3', 'work-4', '가을', '/images/rhee-work-4.jpg', ARRAY['색연필', '도화지'], '2022-01-01', 8),
('3', 'work-5', '동굴', '/images/rhee-work-5.jpg', ARRAY['아크릴 물감', '캔버스'], '2023-01-01', 9);
