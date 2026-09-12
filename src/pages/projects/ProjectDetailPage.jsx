import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, CheckCircle } from "lucide-react";
import { getProjectByIdApi } from "../../services/projectApi";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { Skeleton } from "../../components/common/Skeleton";
import { formatShortPrice } from "../../utils/formatters";
import { toast } from "sonner";

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProjectByIdApi(id);
        setProject(res.data);
      } catch (err) {
        toast.error(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <Skeleton className="h-96 w-full rounded-2xl" />;

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Project not found</p>
        <Link to="/projects"><Button variant="primary" size="sm" className="mt-3">Back to Projects</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{project.builder}</span>
            <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {project.location}, {project.city}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block uppercase">Price Range</span>
            <span className="text-lg font-bold text-emerald-700">
              {formatShortPrice(project.priceMin)} - {formatShortPrice(project.priceMax)}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{project.description || "No description provided."}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Configurations & Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {project.configurations?.map((c, i) => (
              <Badge key={i} variant="primary">{c}</Badge>
            ))}
            {project.amenities?.map((a, i) => (
              <Badge key={i} variant="default">{a}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
