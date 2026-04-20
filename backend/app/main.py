from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import drivers, teams, venues, laps

app = FastAPI(
    title="f(x) API",
    description="Motorsport analytics — F1, F2, F3. CV-derived telemetry and trajectory predictions.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(drivers.router, prefix="/api/v1")
app.include_router(teams.router, prefix="/api/v1")
app.include_router(venues.router, prefix="/api/v1")
app.include_router(laps.router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"product": "f(x)", "version": "0.1.0", "status": "ok"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/api/v1/standings/current")
async def live_standings():
    from app.services import jolpica
    try:
        constructors = await jolpica.get_constructor_standings("current")
        drivers = await jolpica.get_driver_standings("current")
        return {"constructors": constructors, "drivers": drivers}
    except Exception as e:
        return {"error": str(e)}
