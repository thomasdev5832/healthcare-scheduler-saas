/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { PageActions, PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AppointmentsClientProps {
    patients: any[];
    doctors: any[];
    appointments: any[];
    AddAppointmentButton: React.ComponentType<{ doctors: any[]; patients: any[] }>;
    appointmentsTableColumns: any[];
}

export const AppointmentsClient = ({
    patients,
    doctors,
    appointments,
    AddAppointmentButton,
    appointmentsTableColumns
}: AppointmentsClientProps) => {
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [dateFilter, setDateFilter] = useState<string | undefined>(formattedToday);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const filteredAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            // Filtro por busca (nome do paciente ou médico)
            const matchesSearch = searchTerm === "" ||
                appointment.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                appointment.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase());

            // Filtro por médico
            const matchesDoctor = selectedDoctor === "all" ||
                appointment.doctorId === selectedDoctor;

            // Filtro por status
            const matchesStatus = selectedStatus === "all" ||
                appointment.status === selectedStatus;

            // Filtro por data
            let appointmentDate: string | undefined;
            if (appointment.date) {
                const dateObj = new Date(appointment.date);
                if (!isNaN(dateObj.getTime())) {
                    appointmentDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
                }
            }
            const matchesDate = !dateFilter || appointmentDate === dateFilter;

            return matchesSearch && matchesDoctor && matchesStatus && matchesDate;
        });
    }, [appointments, searchTerm, selectedDoctor, selectedStatus, dateFilter]);

    // Lógica de paginação
    const totalItems = filteredAppointments.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedAppointments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredAppointments.slice(startIndex, endIndex);
    }, [filteredAppointments, currentPage, itemsPerPage]);

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedDoctor("all");
        setSelectedStatus("all");
        setDateFilter(formattedToday);
        setCurrentPage(1);
    };

    const hasActiveFilters = searchTerm !== "" || selectedDoctor !== "all" ||
        selectedStatus !== "all" || dateFilter !== formattedToday;

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <PageTitle>Agendamentos</PageTitle>
                    <PageDescription>Gerencie os agendamentos da sua clínica.</PageDescription>
                </PageHeaderContent>
                <PageActions>
                    <AddAppointmentButton doctors={doctors} patients={patients} />
                </PageActions>
            </PageHeader>
            <PageContent>
                <div className="mb-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Filtros</h3>
                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                className="h-8"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Limpar filtros
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Buscar</label>
                            <Input
                                placeholder="Nome do paciente ou médico..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-9"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Médico</label>
                            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Selecionar médico" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos os médicos</SelectItem>
                                    {doctors.map((doctor) => (
                                        <SelectItem key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Selecionar status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos os status</SelectItem>
                                    <SelectItem value="scheduled">Agendado</SelectItem>
                                    <SelectItem value="completed">Concluído</SelectItem>
                                    <SelectItem value="canceled">Cancelado</SelectItem>
                                    <SelectItem value="no_show">Não compareceu</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 w-fit">
                            <DatePicker
                                date={dateFilter}
                                onDateChange={setDateFilter}
                                label="Data"
                            />
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Mostrando {paginatedAppointments.length} de {totalItems} agendamentos
                        {hasActiveFilters && " (filtrado)"}
                    </div>
                </div>

                {filteredAppointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <p className="text-muted-foreground text-lg">
                            {hasActiveFilters
                                ? "Nenhum agendamento encontrado com os filtros aplicados."
                                : "Nenhum agendamento cadastrado."
                            }
                        </p>
                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                onClick={clearFilters}
                                className="mt-4"
                            >
                                Limpar filtros
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <DataTable columns={appointmentsTableColumns} data={paginatedAppointments} />
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    Itens por página:
                                </span>
                                <Select
                                    value={itemsPerPage.toString()}
                                    onValueChange={(value) => {
                                        setItemsPerPage(Number(value));
                                        setCurrentPage(1);
                                    }}
                                >
                                    <SelectTrigger className="h-8 w-16">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Página {currentPage} de {totalPages}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    aria-label="Página anterior"
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    aria-label="Próxima página"
                                >
                                    Próximo
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </PageContent>
        </PageContainer>
    );
};