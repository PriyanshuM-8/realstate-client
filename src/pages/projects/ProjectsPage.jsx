import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, MapPin, Plus, Search } from "lucide-react";
import { getProjectsApi, createProjectApi } from "../../services/projectApi";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { Textarea } from "../../components/common/Textarea";
import { Skeleton } from "../../components/common/Skeleton";
import { formatShortPrice } from "../../utils/formatters";
import { toast } from "sonner";

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [builder, setBuilder] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [propertyType, setPropertyType] = useState("Residential Apartment");
  const [priceMin, setPriceMin] = useState(8500000);
  const [priceMax, setPriceMax] = useState(16500000);
  const [description, setDescription] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getProjectsApi();
      setProjects(res.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await createProjectApi({
        name,
        builder,
        location,
        city,
        propertyType,
        priceMin: Number(priceMin),
        priceMax: Number(priceMax),
        description,
        configurations: ["2 BHK", "3 BHK"],
        amenities: ["Clubhouse", "Gym", "Swimming Pool"]
      });
      toast.success("Project created successfully!");
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.message || "Failed to create project");
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Real Estate Projects Portfolio</h1>
          <p className="text-xs text-slate-500">Manage developer projects, configurations, and pricing</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} variant="primary" size="sm" icon={Plus}>
          Add New Project
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-72 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-44 bg-slate-100 relative overflow-hidden">
                <img
                  src={proj.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"}
                  alt={proj.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-slate-900/80 text-white backdrop-blur-xs text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {proj.status}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{proj.builder}</span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mt-0.5">{proj.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {proj.location}, {proj.city}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Price Range</span>
                    <span className="text-xs font-bold text-emerald-700">
                      {formatShortPrice(proj.priceMin)} - {formatShortPrice(proj.priceMax)}
                    </span>
                  </div>

                  <Link to={`/projects/${proj._id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Real Estate Project">
        <form onSubmit={handleCreateProject} className="space-y-4">
          <Input label="Project Name *" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Prestige Lakeview" />
          <Input label="Builder / Developer *" value={builder} onChange={(e) => setBuilder(e.target.value)} required placeholder="Prestige Group" />

          <div className="grid grid-cols-2 gap-3">
            <Input label="Location *" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder="Whitefield" />
            <Input label="City *" value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Bengaluru" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Min Price (INR ₹) *" type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} required />
            <Input label="Max Price (INR ₹) *" type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} required />
          </div>

          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
            <Button variant="primary" type="submit" isLoading={createLoading}>Save Project</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
