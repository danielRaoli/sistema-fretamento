import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface HorarioLocal {
  data: string;
  hora: string;
  local: string;
}

interface LocationTimeInfoProps {
  title: string;
  info: HorarioLocal;
  icon: React.ReactNode;
}

export function LocationTimeInfo({ title, info, icon }: LocationTimeInfoProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-semibold">{title}</h3>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Data: {new Date(info.data).toLocaleDateString("pt-BR")}
            </p>
            <p className="text-sm text-muted-foreground">Hora: {info.hora}</p>
            <p className="text-sm text-muted-foreground">Local: {info.local}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}