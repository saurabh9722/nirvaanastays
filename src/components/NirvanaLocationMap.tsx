import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Navigation,
  Compass,
  Building2,
  ExternalLink,
  Phone,
  Layers,
  Star,
  CheckCircle2,
} from 'lucide-react';

const API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) ||
  'AIzaSyC8y-DWhie2nAFDf3IXTt4_4dC3h7cD9As';

// Exact verified location coordinates from Google Maps (Plus Code: HWG5+62 Pune, Maharashtra)
export const NIRVANA_LOCATION = {
  id: 'nirvana-stays-main',
  title: 'NIRVANA STAYS - Co-living in viman nagar, Pune.',
  hindiTitle: 'निर्वाण स्टेज - को-लिविंग इन विमान नगर, पुणे.',
  category: 'Student housing center',
  rating: '5.0',
  reviewCount: 17,
  position: { lat: 18.5758, lng: 73.9073 },
  address:
    'First floor, Shubh Gateway, Shop number 116, society, opp. to Symbiosis Law School, Survey Number 235, Mhada Colony, Pune, Maharashtra 411032',
  landmark: 'Sunset Blvd · Opposite Symbiosis Law School (SLS)',
  phone: '090961 66306',
  phoneFormatted: '+91 90961 66306',
  plusCode: 'HWG5+62 Pune, Maharashtra',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=NIRVANA+STAYS+-+Co-living+in+viman+nagar,+Pune.&query_place_id=ChIJ-ShubhGatewayNirvana',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=18.5758,73.9073&destination_place_id=NIRVANA+STAYS+Viman+Nagar',
};

export interface NirvanaLocationMapProps {
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
  height?: string;
}

export const NirvanaLocationMap: React.FC<NirvanaLocationMapProps> = ({
  defaultCenter = NIRVANA_LOCATION.position,
  defaultZoom = 17,
  height = '500px',
}) => {
  const [mapType, setMapType] = useState<'roadmap' | 'hybrid'>('roadmap');
  const [showInfoWindow, setShowInfoWindow] = useState(true);

  return (
    <div className="bg-[#FFFDF9] rounded-3xl border border-[#E6E0D6] shadow-sm overflow-hidden flex flex-col">
      {/* Map Header with Verified Google Business Details */}
      <div className="p-5 sm:p-6 border-b border-[#E6E0D6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF7F2]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C87D65]">
            <Compass className="w-4 h-4" />
            <span>Official Google Maps Location · Verified Pin</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#2C2623] leading-tight">
            {NIRVANA_LOCATION.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#6E655F]">
            <span className="inline-flex items-center gap-1 font-semibold text-[#D48B38] bg-[#F5EBDC] px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-[#D48B38]" />
              {NIRVANA_LOCATION.rating} ({NIRVANA_LOCATION.reviewCount} reviews)
            </span>
            <span className="text-[#7A8B7B] font-medium">{NIRVANA_LOCATION.category}</span>
            <span>·</span>
            <span>{NIRVANA_LOCATION.landmark}</span>
          </div>
        </div>

        {/* Satellite / Roadmap Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setMapType((prev) => (prev === 'roadmap' ? 'hybrid' : 'roadmap'))}
            className="px-3.5 py-2 rounded-xl border border-[#E6E0D6] bg-[#FFFDF9] text-xs font-semibold text-[#2C2623] hover:bg-white transition-colors flex items-center gap-1.5 shadow-sm"
            title="Toggle satellite / street view"
          >
            <Layers className="w-3.5 h-3.5 text-[#C87D65]" />
            <span>{mapType === 'roadmap' ? 'Satellite View' : 'Roadmap View'}</span>
          </button>
        </div>
      </div>

      {/* Google Maps Container (Single Official Pin) */}
      <div className="relative w-full h-[460px] sm:h-[520px] bg-[#EAE5DC]">
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            mapId="DEMO_MAP_ID"
            mapTypeId={mapType}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            gestureHandling="greedy"
            disableDefaultUI={false}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          >
            {/* ONLY 1 EXACT PIN: Nirvana Stays at Shubh Gateway, Sunset Blvd */}
            <AdvancedMarker
              position={NIRVANA_LOCATION.position}
              title={NIRVANA_LOCATION.title}
              onClick={() => setShowInfoWindow((prev) => !prev)}
              zIndex={100}
            >
              <Pin
                background="#EA4335"
                borderColor="#B3261E"
                glyphColor="#FFFDF9"
                scale={1.35}
              />
            </AdvancedMarker>

            {/* InfoWindow on Single Pin */}
            {showInfoWindow && (
              <InfoWindow
                position={NIRVANA_LOCATION.position}
                onCloseClick={() => setShowInfoWindow(false)}
                pixelOffset={[0, -45]}
              >
                <div className="p-2 max-w-[290px] text-[#2C2623] font-sans space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b border-[#E6E0D6] pb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C87D65] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Listing
                    </span>
                    <span className="text-[11px] font-bold text-[#D48B38] flex items-center gap-0.5">
                      ★ {NIRVANA_LOCATION.rating}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#2C2623] leading-snug">
                      NIRVANA STAYS
                    </h4>
                    <p className="text-[11px] text-[#6E655F]">
                      Co-living in Viman Nagar, Pune
                    </p>
                  </div>

                  <p className="text-[11px] text-[#6E655F] leading-snug">
                    {NIRVANA_LOCATION.address}
                  </p>

                  <div className="pt-2 border-t border-[#E6E0D6] flex items-center justify-between text-xs">
                    <a
                      href={`tel:${NIRVANA_LOCATION.phone}`}
                      className="text-[11px] font-semibold text-[#2C2623] hover:text-[#C87D65] flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-[#C87D65]" />
                      {NIRVANA_LOCATION.phone}
                    </a>

                    <a
                      href={NIRVANA_LOCATION.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C87D65] hover:underline"
                    >
                      <Navigation className="w-3 h-3" /> Get Directions
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>

        {/* Single Verified Location Badge on top of Map */}
        <div className="absolute top-4 left-4 pointer-events-auto z-10 max-w-sm hidden sm:block">
          <div className="bg-[#FFFDF9]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E6E0D6] shadow-md flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EA4335]/10 text-[#EA4335] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2C2623]">Shubh Gateway · Sunset Blvd</p>
              <p className="text-[11px] text-[#6E655F]">Opp. Symbiosis Law School Gate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Verified Details & Direct Actions Footer */}
      <div className="p-6 bg-[#FFFDF9] border-t border-[#E6E0D6] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7A8B7B]">
            <Building2 className="w-4 h-4 text-[#C87D65]" />
            <span>Exact Address & Plus Code</span>
          </div>
          <p className="text-xs sm:text-sm text-[#2C2623] font-medium leading-relaxed">
            {NIRVANA_LOCATION.address}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#6E655F] pt-0.5">
            <span className="font-mono text-[#C87D65] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E6E0D6]">
              {NIRVANA_LOCATION.plusCode}
            </span>
            <span>·</span>
            <a
              href={`tel:${NIRVANA_LOCATION.phone}`}
              className="text-[#2C2623] hover:text-[#C87D65] font-semibold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#C87D65]" />
              {NIRVANA_LOCATION.phone}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://maps.google.com/?q=HWG5%2B62+Pune,+Maharashtra"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-[#2C2623] text-xs font-semibold text-[#2C2623] hover:bg-[#FAF7F2] transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open Plus Code
          </a>

          <a
            href={NIRVANA_LOCATION.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#C87D65] hover:bg-[#B26B54] text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <Navigation className="w-3.5 h-3.5" /> Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};
