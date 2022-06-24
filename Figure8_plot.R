
#################### Figure 8 #######################################

## Packages

library(ggplot2)
library("colorspace") 

## Reading results

nome <- "https://angelicamariatortola.github.io/academic/Figure8_results.txt" 
simu_data <- read.table(nome, header = T)
simu_data$size <- simu_data$size^2

ggp <- ggplot(data = simu_data, mapping = aes(y = time_by_iter, x = size,
                                       group = model, colour= model)) +
  scale_color_manual(labels = c(bquote("LMC" ~ "(N.param=6)"),
  bquote("MatConstr" ~ "(N.param=7)"),
  bquote("MatSep" ~ "(N.param=5)"),
  bquote("MatSimpler" ~ "(N.param=7)")),
  values = qualitative_hcl(4, rev = F, palette = "Dark 3")) +
  scale_x_continuous(breaks = unique(simu_data$size)) + 
  geom_line(size=1.1) +
  geom_point(size=3) +
  labs(y = "Average time per iteration (in seconds)", x = "Sample size", color = "Model\n") +
  theme_bw() +
  guides(col = guide_legend(reverse = F)) +
  theme(legend.text.align = 0,
        title = element_text(size = 14),
        axis.text.x = element_text(hjust = 1, size = 14, vjust=1, colour = 'black'),
        axis.text.y = element_text(hjust = 1, size = 14, vjust=1, colour = 'black'),
        axis.title = element_text(hjust = 0.5, size = 14, vjust=0.5,
                                  margin = margin(t=0, r=0,b=0, l=0)),
        axis.ticks.x = element_blank(),
        axis.ticks.y = element_blank(),
        panel.border = element_blank(),
        plot.background = element_rect(fill = 'white'))
ggp

