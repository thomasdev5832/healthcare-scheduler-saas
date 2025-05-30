"use client";

import { List, Phone, User } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
    patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
    const [isUpsertPatientDialogOpen, setIsUpsertPatientDialogOpen] = useState(false);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <h3 className="text-sm font-medium">{patient.name}</h3>
                        <p className="text-muted-foreground text-sm">{patient.email}</p>
                    </div>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-2">
                <Badge variant="outline">
                    <Phone className="mr-1" />
                    {patient.phoneNumber}
                </Badge>
                <Badge variant="outline">
                    <User className="mr-1" />
                    {patient.sex === "male" ? "Masculino" : "Feminino"}
                </Badge>
            </CardContent>
            <Separator />
            <CardFooter>
                <Dialog open={isUpsertPatientDialogOpen} onOpenChange={setIsUpsertPatientDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">
                            <List className="mr-1" />
                            Ver detalhes
                        </Button>
                    </DialogTrigger>
                    <UpsertPatientForm
                        patient={patient}
                        onSuccess={() => setIsUpsertPatientDialogOpen(false)}
                        isOpen={isUpsertPatientDialogOpen}
                    />
                </Dialog>
            </CardFooter>
        </Card>
    );
}

export default PatientCard; 