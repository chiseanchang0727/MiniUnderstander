from pydantic import BaseModel
from datetime import date
from typing import Optional
from .models import PlanStatus

class DailyPlanBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: date
    status: Optional[PlanStatus] = PlanStatus.PENDING

class DailyPlanCreate(DailyPlanBase):
    pass

class DailyPlan(DailyPlanBase):
    id: int

    class Config:
        from_attributes = True

class DailyPlanUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[PlanStatus] = None 