CREATE TABLE "bookmarks" (
    id VARCHAR(50) PRIMARY KEY,
    tag VARCHAR(56) NOT NULL,
    file VARCHAR(128) NOT NULL,
    line NUMBER NOT NULL,
    column NUMBER NOT NULL,
    headline VARCHAR(96),
    short_descr VARCHAR(312) NOT NULL,
    mddoc VARCHAR(512),
    issue_ids VARCHAR(1024)
);

CREATE TABLE "issues" (
    id VARCHAR(50) PRIMARY KEY,
    tag VARCHAR(56) NOT NULL,
    headline VARCHAR(96) NOT NULL,
    short_descr VARCHAR(312) NOT NULL,
    description VARCHAR(1024)
    closed VARCHAR(5),
    active VARCHAR(5),
    milestone_ids VARCHAR(2096)
)

CREATE TABLE "milestones" (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(96) NOT NULL,
    closed VARCHAR(5),
    issue_ids VARCHAR(1024)
)