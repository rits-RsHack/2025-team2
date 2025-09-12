from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session



class Database:
    def __init__(self,db_url):
        self.engine = create_engine(db_url)
        self.SessionLocal=sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    def get_session(self) -> Session:
        return self.SessionLocal()