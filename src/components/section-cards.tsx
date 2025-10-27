import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCryptoStore } from "@/store/useCryptoStore";
import type { Crypto } from "@/types/crypto";
import { useCryptoRealtime } from "@/hooks/useCryptoRealtime";

export function SectionCards() {
  useCryptoRealtime();
  const { cryptos } = useCryptoStore();

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cryptos.slice(0, 4).map((crypto: Crypto) => {
        const isUp = crypto.changePercent24Hr >= 0;
        const Icon = isUp ? IconTrendingUp : IconTrendingDown;

        return (
          <Card key={crypto.id} className="@container/card">
            <CardHeader>
              <CardDescription>{crypto.name}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                ${crypto.priceUsd.toLocaleString()}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <Icon
                    className={`${
                      isUp ? "text-green-500" : "text-red-500"
                    } h-4 w-4`}
                  />
                  {isUp ? "+" : ""}
                  {crypto.changePercent24Hr.toFixed(2)}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {crypto.statusText} <Icon className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground">
                24h Volume: ${(crypto.volumeUsd24Hr / 1_000_000_000).toFixed(1)}
                B
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
