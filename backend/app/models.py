from sqlalchemy import Column, Integer, String, Date, Enum
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

class PlanStatus(str, enum.Enum):
    PENDING = "pending"
    WORKING = "working"
    FINISHED = "finished"


class DailyPlan(Base):
    __tablename__ = "daily_plans"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    date = Column(Date, index=True)
    status = Column(Enum(PlanStatus), default=PlanStatus.PENDING) 