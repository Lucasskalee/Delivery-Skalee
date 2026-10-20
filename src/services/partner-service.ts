import type { Partner, PartnerSegment } from "@/domain/partner";
import { dataClient } from "@/services/data-client";

export interface PartnerListFilter {
  segment?: "all" | PartnerSegment;
  query?: string;
}

export function listPartners(filter?: PartnerListFilter): Partner[] {
  const allPartners = dataClient.readPartners();
  const segment = filter?.segment;
  const rawQuery = filter?.query?.trim().toLowerCase() ?? "";

  return allPartners.filter((partner) => {
    const matchesSegment =
      !segment || segment === "all" || partner.segment === segment;
    const matchesQuery =
      !rawQuery ||
      partner.name.toLowerCase().includes(rawQuery) ||
      partner.description.toLowerCase().includes(rawQuery) ||
      partner.address.toLowerCase().includes(rawQuery);

    return matchesSegment && matchesQuery;
  });
}

export function getPartnerById(partnerId: string): Partner | undefined {
  return dataClient.readPartners().find((p) => p.id === partnerId);
}

export function getPartnerBySlug(slug: string): Partner | undefined {
  return dataClient.readPartners().find((p) => p.slug === slug);
}

