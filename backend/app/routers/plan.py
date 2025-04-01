from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from typing import List
from app.database import get_db
from app import crud, schemas

router = APIRouter()

@router.post("/", response_model=schemas.DailyPlan)
def create_plan(plan: schemas.DailyPlanCreate, db: Session = Depends(get_db)):
    return crud.create_plan(db=db, plan=plan)

@router.get("/", response_model=List[schemas.DailyPlan])
def read_plans(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    plans = crud.get_all_plans(db, skip=skip, limit=limit)
    return plans

@router.get("/{plan_id}", response_model=schemas.DailyPlan)
def read_plan(plan_id: int, db: Session = Depends(get_db)):
    db_plan = crud.get_plan(db, plan_id=plan_id)
    if db_plan is None:
        raise HTTPException(status_code=404, detail="Plan not found")
    return db_plan

@router.get("/date/{plan_date}", response_model=List[schemas.DailyPlan])
def read_plans_by_date(plan_date: date, db: Session = Depends(get_db)):
    plans = crud.get_plans_by_date(db, plan_date=plan_date)
    return plans

@router.put("/{plan_id}", response_model=schemas.DailyPlan)
def update_plan(plan_id: int, plan: schemas.DailyPlanUpdate, db: Session = Depends(get_db)):
    db_plan = crud.update_plan(db, plan_id=plan_id, plan=plan)
    if db_plan is None:
        raise HTTPException(status_code=404, detail="Plan not found")
    return db_plan

@router.delete("/{plan_id}")
def delete_plan(plan_id: int, db: Session = Depends(get_db)):
    success = crud.delete_plan(db, plan_id=plan_id)
    if not success:
        raise HTTPException(status_code=404, detail="Plan not found")
    return {"message": "Plan deleted successfully"} 