import { useState } from "react";
import { Terminal, Play, Check, AlertCircle, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

// Types inline definition to make it self-contained
interface SandboxStep {
  id: number;
  label: string;
  title: string;
  instruction: string;
  code: string;
  endpoint: string;
  expectedResponse: any;
}

export default function MicroJetShowcase() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [passengerName, setPassengerName] = useState<string>("Jane Doe");
  const [seatsCount, setSeatsCount] = useState<number>(2);
  const [flightId, setFlightId] = useState<string>("MJ-707");
  const [activeEndpoint, setActiveEndpoint] = useState<string>("bookings"); // "flights" | "bookings"
  
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<{
    status: number;
    latencyMs: number;
    data: any;
    error?: string;
  } | null>(null);

  const steps: SandboxStep[] = [
    {
      id: 1,
      label: "1. Instantiate",
      title: "Initialize the Engine",
      instruction: "Import the core MicroJet class and create a lightweight app instance with sub-millisecond setup costs.",
      code: `from microjet import MicroJet

# Zero-allocation ASGI engine initialization
app = MicroJet()`,
      endpoint: "",
      expectedResponse: {}
    },
    {
      id: 2,
      label: "2. Add Dynamic Routing",
      title: "Register Highly Efficient Routes",
      instruction: "Define dynamic parameterized endpoints. MicroJet extracts parameters automatically in the radix tree traversal path.",
      code: `# Declarative async parameterized routes 12x faster than FastAPI
@app.get("/api/flights/{id}")
async def get_flight(id: str):
    return {
        "flightId": id,
        "status": "active",
        "altitude": "34,000 ft",
        "timestamp": 1782565100122
    }`,
      endpoint: "flights",
      expectedResponse: {
        flightId: "MJ-707",
        status: "active",
        altitude: "34,000 ft",
        timestamp: 1782565100122
      }
    },
    {
      id: 3,
      label: "3. Enforce Type Safety",
      title: "Define Schema Validation Rules",
      instruction: "Bind strict schemas directly to endpoints using standard Pydantic models. MicroJet rejects malformed payloads instantly.",
      code: `from pydantic import BaseModel, Field

# Declare booking payload schema constraints
class BookingSchema(BaseModel):
    passenger_name: str = Field(..., min_length=2)
    seats: int = Field(..., ge=1, le=4) # Max 4 seats permitted

@app.post("/api/bookings", schema=BookingSchema)
async def create_booking(booking: BookingSchema):
    return {
        "success": True,
        "bookingId": "BK-483921",
        "passenger": booking.passenger_name,
        "allocatedSeats": booking.seats
    }`,
      endpoint: "bookings",
      expectedResponse: {
        success: true,
        bookingId: "BK-483921",
        passenger: "Jane Doe",
        allocatedSeats: 2
      }
    },
    {
      id: 4,
      label: "4. Deploy Server",
      title: "Spin Up and Listen",
      instruction: "Bind your API to an open network port. MicroJet compiles all routes on launch to achieve near-native execution speed.",
      code: `# Fast cold-start boot in under 2 milliseconds
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)`,
      endpoint: "",
      expectedResponse: {}
    }
  ];

  const handleRunEndpoint = () => {
    setIsRunning(true);
    setTerminalOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      const randomLatency = (Math.random() * 0.4 + 0.1).toFixed(3);

      if (activeEndpoint === "flights") {
        setTerminalOutput({
          status: 200,
          latencyMs: parseFloat(randomLatency),
          data: {
            flightId: flightId || "MJ-707",
            status: "active",
            carrier: "MicroJet Aerospace",
            altitude: "34,000 ft",
            velocity: "Mach 0.85",
            origin: "SFO",
            destination: "HND",
            timestamp: Date.now()
          }
        });
      } else {
        if (!passengerName || passengerName.trim().length < 2) {
          setTerminalOutput({
            status: 400,
            latencyMs: parseFloat(randomLatency),
            data: {
              error: "SchemaValidationError",
              message: "Invalid payload properties detected",
              fields: { passenger_name: "Value must be at least 2 characters long" }
            }
          });
        } else if (seatsCount > 4) {
          setTerminalOutput({
            status: 400,
            latencyMs: parseFloat(randomLatency),
            data: {
              error: "SchemaValidationError",
              message: "Value violates range constraint",
              fields: { seats: "Value must be less than or equal to 4" }
            }
          });
        } else if (seatsCount < 1) {
          setTerminalOutput({
            status: 400,
            latencyMs: parseFloat(randomLatency),
            data: {
              error: "SchemaValidationError",
              message: "Value violates range constraint",
              fields: { seats: "Value must be greater than or equal to 1" }
            }
          });
        } else {
          setTerminalOutput({
            status: 201,
            latencyMs: parseFloat(randomLatency),
            data: {
              success: true,
              bookingId: "BK-" + Math.floor(Math.random() * 900000 + 100000),
              passenger_name: passengerName,
              allocatedSeats: seatsCount,
              status: "CONFIRMED",
              gate: "C14",
              timestamp: new Date().toISOString()
            }
          });
        }
      }
    }, 800);
  };

  const scrollToSandbox = () => {
    const sandboxElement = document.getElementById("sandbox");
    if (sandboxElement) {
      sandboxElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentStep = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-28 bg-black overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#a855f7_1px,transparent_1px)] [background-size:40px_40px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Want to learn more
              <br />
              about MicroJet?
            </h2>
          </div>

          <div className="relative rounded-[40px] border border-zinc-800 bg-[#0d0d10] min-h-[600px] lg:min-h-[700px] overflow-hidden">
            <div className="max-w-xl p-8 md:p-16">
              <h3 className="text-4xl md:text-5xl font-semibold text-white mb-8">
                New to MicroJet?
              </h3>
              <p className="text-xl md:text-2xl leading-relaxed text-zinc-400">
                Try our completely interactive playground designed to give you
                hands-on experience with the MicroJet framework.
              </p>
              <button
                onClick={scrollToSandbox}
                className="mt-12 md:mt-16 flex items-center gap-4 text-2xl md:text-3xl font-semibold text-white hover:text-cyan-400 transition cursor-pointer group"
              >
                Start coding <span className="transform group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>

            {/* Floating Code Editor */}
            <div className="absolute right-0 bottom-0 w-full lg:w-[48%] hidden md:block">
              <div className="rounded-tl-3xl bg-[#16161b] border border-zinc-800 shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                  <span className="text-zinc-400 text-lg">main.py</span>
                  <button className="text-zinc-500 text-3xl">+</button>
                </div>
                <pre className="p-8 text-sm font-mono text-slate-300 overflow-auto h-[350px] lg:h-[430px]">
{`from microjet import MicroJet

app = MicroJet()

@app.get("/")
async def home():
    return {
        "framework":"MicroJet",
        "speed":"⚡ Ultra Fast"
    }

app.run()`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Playground Section */}
      <section id="sandbox" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] radial-glow rounded-full pointer-events-none filter blur-3xl opacity-30" />
        <div className="absolute bottom-10 left-10 w-96 h-96 radial-glow-cyan rounded-full pointer-events-none filter blur-2xl opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest bg-blue-950/40 border border-blue-900/60 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Interactive Playground
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              MicroJet Core Workspace
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base font-light">
              Step through the lifecycle of a high-performance endpoint and trigger interactive requests below.
            </p>
          </div>

          {/* Step Navigation Bar */}
          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(step.id);
                  if (step.endpoint) {
                    setActiveEndpoint(step.endpoint);
                  }
                }}
                className={`px-4 py-3 text-xs sm:text-sm font-semibold rounded-lg border text-left transition-all cursor-pointer ${
                  activeStep === step.id
                    ? "bg-white border-white text-slate-950 shadow-md"
                    : "bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                <div className={`font-mono text-[10px] mb-1 ${activeStep === step.id ? "text-blue-600" : "text-blue-400"}`}>
                  STEP 0{step.id}
                </div>
                {step.label}
              </button>
            ))}
          </div>

          {/* Dynamic Sandbox Display */}
          <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Code editor block */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden shadow-2xl">
              <div className="bg-[#0f1423] border-b border-slate-800/80 px-5 py-3 flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 font-semibold uppercase">
                  {currentStep.title}
                </span>
                <span className="text-[10px] font-mono text-slate-500">main.py</span>
              </div>

              <div className="flex-1 p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 text-left overflow-x-auto whitespace-pre bg-slate-950/40 min-h-[220px]">
                {currentStep.code}
              </div>

              <div className="bg-[#0f1423]/40 p-5 border-t border-slate-800/80">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {currentStep.instruction}
                </p>
              </div>
            </div>

            {/* Interactive Live API Request Sandbox */}
            <div className="lg:col-span-5 rounded-xl bg-[#0f1423] border border-slate-800/80 p-6 backdrop-blur-sm flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
                    Live API Simulator
                  </h3>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-950/80 border border-blue-900/60 text-[10px] font-mono text-blue-400">
                    <Sparkles className="w-2.5 h-2.5" /> Virtual Core
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800/60 mb-5">
                  <button
                    onClick={() => {
                      setActiveEndpoint("flights");
                      setTerminalOutput(null);
                    }}
                    className={`py-1.5 text-center font-mono text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                      activeEndpoint === "flights"
                        ? "bg-blue-600/20 border border-blue-500/30 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    GET /api/flights
                  </button>
                  <button
                    onClick={() => {
                      setActiveEndpoint("bookings");
                      setTerminalOutput(null);
                    }}
                    className={`py-1.5 text-center font-mono text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                      activeEndpoint === "bookings"
                        ? "bg-blue-600/20 border border-blue-500/30 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    POST /api/bookings
                  </button>
                </div>

                {activeEndpoint === "flights" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                        URL flight parameter (:id)
                      </label>
                      <input
                        type="text"
                        value={flightId}
                        onChange={(e) => setFlightId(e.target.value.replace(/\s+/g, "").toUpperCase())}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-slate-200 text-xs font-mono focus:border-blue-500/50 focus:outline-none"
                        placeholder="e.g. MJ-707"
                        maxLength={10}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 leading-relaxed font-light flex items-start gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span>Parameter will be extracted on matching the routing radix tree path.</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                        passenger_name (String constraint)
                      </label>
                      <input
                        type="text"
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-slate-200 text-xs focus:border-blue-500/50 focus:outline-none"
                        placeholder="Enter passenger name"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                          seats (Max 4 limit constraint)
                        </label>
                        <span className={`text-xs font-mono font-bold ${seatsCount > 4 ? "text-red-400 animate-pulse" : "text-blue-400"}`}>
                          {seatsCount} {seatsCount > 4 ? "⚠️ OVER LIMIT" : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="6"
                          value={seatsCount}
                          onChange={(e) => setSeatsCount(parseInt(e.target.value))}
                          className="flex-1 accent-blue-500 bg-slate-950 border border-slate-800/80 rounded-lg cursor-pointer h-2"
                        />
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 leading-relaxed font-light flex items-start gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span>Slide above 4 to test schema validation engine failure.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Console Area */}
              <div className="mt-6 pt-5 border-t border-slate-800/60">
                <button
                  onClick={handleRunEndpoint}
                  disabled={isRunning}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {isRunning ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent" />
                      Executing virtual core...
                    </span>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                      Send Request to MicroJet
                    </>
                  )}
                </button>

                {terminalOutput && (
                  <div className="mt-4 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-left text-xs animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${terminalOutput.status >= 400 ? "bg-red-400" : "bg-emerald-400"}`} />
                        <span className={`font-semibold ${terminalOutput.status >= 400 ? "text-red-400" : "text-emerald-400"}`}>
                          HTTP {terminalOutput.status}
                        </span>
                      </div>
                      <span className="text-slate-500 text-[10px]">
                        {terminalOutput.latencyMs} ms latency
                      </span>
                    </div>
                    <pre className="max-h-[140px] overflow-y-auto whitespace-pre text-slate-300 text-[11px] leading-relaxed select-all">
                      {JSON.stringify(terminalOutput.data, null, 2)}
                    </pre>
                    
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
