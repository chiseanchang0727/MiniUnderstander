from sqlalchemy.orm import Session
from datetime import date
from typing import List, Optional
from . import models, schemas

def create_plan(db: Session, plan: schemas.DailyPlanCreate) -> models.DailyPlan:
    db_plan = models.DailyPlan(**plan.model_dump())
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    return db_plan

def get_plan(db: Session, plan_id: int) -> Optional[models.DailyPlan]:
    return db.query(models.DailyPlan).filter(models.DailyPlan.id == plan_id).first()

def get_plans_by_date(db: Session, plan_date: date) -> List[models.DailyPlan]:
    return db.query(models.DailyPlan).filter(models.DailyPlan.date == plan_date).all()

def get_all_plans(db: Session, skip: int = 0, limit: int = 100) -> List[models.DailyPlan]:
    return db.query(models.DailyPlan).offset(skip).limit(limit).all()

def update_plan(db: Session, plan_id: int, plan: schemas.DailyPlanUpdate) -> Optional[models.DailyPlan]:
    db_plan = get_plan(db, plan_id)
    if not db_plan:
        return None
    
    update_data = plan.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_plan, field, value)
    
    db.commit()
    db.refresh(db_plan)
    return db_plan

def delete_plan(db: Session, plan_id: int) -> bool:
    db_plan = get_plan(db, plan_id)
    if not db_plan:
        return False
    
    db.delete(db_plan)
    db.commit()
    return True 